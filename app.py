from flask import Flask
from flask import Flask, render_template, url_for, flash, redirect, request, g,send_from_directory,session
# from falsk_sqlalchemy import falsk_sq
from forms import UserForm, PropertyForm, ConfirmForm
from wtforms import TextField, IntegerField, TextAreaField, SubmitField, RadioField,SelectField
from wtforms import validators, ValidationError
import random
import os
import sqlite3
import uuid
import jsonify
from dbTest import connect_db, get_db
app = Flask(__name__)
app.secret_key = 'development key'
# app.config.from_object('config')
# app.config.from_pyfile('config.py')
# print(app.config['UPLOAD_FOLDER']) 

@app.teardown_appcontext
# I don't know if it should be used like this
def close_db(error):
    if hasattr(g, 'postgres_db_cur'):
        g.postgres_db_cur.close()
    if hasattr(g, 'postgres_db_cunn'):
        g.postgres_db_conn.close()

######## load info page ######################
@app.route("/landing_page",methods=['GET','POST'])
def landing_page():







@app.route("/", methods=['GET','POST'])
def homepage():
    db = get_db()
    form = UserForm()
    idx=0
    if request.method == "POST":
        # flash('yeah','success')
        if form.validate_on_submit():
           # ip = request.remote_addr
            user_id = str(uuid.uuid4())
            gender = '0' if form.Gender.data == 'F' else '1' #0-female. 1-male
            age = form.Age.data
            address = '0' if form.Address.data == 'F' else '1'   # 0-nonlocal 1-local
            background = '0' if form.Background.data == 'F' else '1' # 0 -nonpro  1 -pro
            properties_1 = form.properties_1.data
            properties_2 = form.properties_2.data
            properties_3 = form.properties_3.data
            session['user_id'] = user_id
            session['gender'] = gender
            session['age'] = age
            session['address'] = address
            session['background'] = background
            session['idx'] = 0
            session['properties_1'] = properties_1
            session['properties_2'] = properties_2
            session['properties_3'] = properties_3
            # db.execute("""insert into user_main(user_id, gender, age, address,background) values (%s, %s, %s, %s, %s)""",[user_id, gender, age, address,background])
            db.execute("""insert into user_main_2(user_id, gender, age, address,background,properties_1,
            properties_2,properties_3) values (%s, %s, %s, %s, %s, %s, %s, %s)""",(user_id, gender, age, 
            address, background, properties_1, properties_2, properties_3))
            return redirect(url_for('videos'))

    return render_template('index.html', title='User info',form = form, index = idx)


#########render video_l ############
@app.route("/rendervideo_1",methods=['GET','POST'])
def rendervideo_1():
    video_l_dir = session.get('video_l_dir')
    # video_l_dir = "../static/video_clip/VID_20190605_164812_10_005_44_103.mp4"
    return render_template('360.html',video_dir = video_l_dir)
#########render video_r ############


@app.route("/rendervideo_2",methods=['GET','POST'])
def rendervideo_2():
    video_r_dir = session.get('video_r_dir')
    return render_template('360.html',video_dir = video_r_dir)


#########render vrmodel_2 ############
@app.route("/vrmodel_1", methods=['GET','POST'])
def vrmodel_1():
    video_l_name = session.get('video_l_name')
    trajectory_l = session.get('trajectory_filepath_l')
    print('trajectory_left',trajectory_l)

    return render_template('vrmap_l.html', trajectory_l = trajectory_l)  


#########render vrmodel_2 ############
@app.route("/vrmodel_2", methods=['GET','POST'])
def vrmodel_2():
    video_r_name = session.get('video_r_name')
    trajectory_r = session.get('trajectory_filepath_r')
    print('trajectory_right',trajectory_r)
    return render_template('vrmap_r.html', trajectory_r = trajectory_r)  


######### load video page ##################
@app.route("/videos", methods=['GET','POST'])
def videos():
    if request.method =='GET':
        if 'idx' not in session:
            print('here')
            return redirect(url_for('homepage'))
    def _helper(data):
        # empty string may cause problem in db
        if data == '':
            return 'NA'
        else:
            return data
    db = get_db()
    # get video uuid, video_name, filepath from db
    db.execute('select uuid, video_name, trajectory, video_server, trajectory_server from video_clip_meta_2')
    video = db.fetchall()
    index_l =  random.randint(0, len(video) - 1)
    index_r = random.randint(0, len(video) - 1)
    while index_r == index_l:
        index_r = random.randint(0, len(video) - 1)
    video_l = video[index_l][1]
    video_r = video[index_r][1]
    video_l_dir = video[index_l][3] ## this is the video_path I need to pass in for videos.html
    video_r_dir = video[index_r][3]
    # video_l_dir = './static/VID_20190603_135848_00_014_347_402.mp4'
    # video_r_dir = './static/VID_20190603_140440_00_015_618_634.mp4'
    session['video_l_dir'] = video_l_dir
    session['video_r_dir'] = video_r_dir
    session['video_l_name'] = video_l
    session['video_r_name'] = video_r   # name used to choose html
    session['trajectory_filepath_l'] = video[index_l][4]
    session['trajectory_filepath_r'] = video[index_r][4]
    form = PropertyForm()
    if request.method == "POST":
        session['idx'] = session.get('idx') + 1
        # select left arrow
        left_text = form.text_left.data
        right_text = form.text_right.data
        left_text_video = form.text_left_video.data
        right_text_video = form.text_right_video.data
        if left_text =='*' and right_text =='*':   # read in the selection of model 
            volume_selection = 'equal'
        elif left_text == '' and right_text == '*':
            volume_selection = 'right'
        elif left_text == '*' and right_text =='':
            volume_selection = 'left'
        else:
            volume_selection = 'bug'

        if left_text_video =='*' and right_text_video =='*':   # read in the selection of video 
            selection = 'equal'
        elif left_text_video == '' and right_text_video == '*':
            selection = 'right'
        elif left_text_video == '*' and right_text_video =='':
            selection = 'left'
        else:
            selection = 'bug'     
        print('let_text',left_text,'right_text',right_text,"left_text_video",left_text_video,"right_text_video",right_text_video)
        user_id = session.get('user_id')
        gender = session.get('gender')
        age = session.get('age')
        address = session.get('address')
        background = session.get('background')
        db.execute("""insert into data_collection_2(user_id, gender, age, address, background,
                    video_l_dir, video_r_dir,
                    selection, volume_selection) values (%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
                    [user_id, gender, age, address, background, video_l, video_r, selection, volume_selection])

        if session['idx'] >= 12:
            return redirect(url_for('question'))
            # return render_template('videos.html',form = form)
        else:
            return redirect(url_for('videos'))
    return render_template('videos.html', form = form, index = session['idx'])
    # return render_template('hello.html')
@app.route("/question", methods=['GET','POST'])
def question():

    form = ConfirmForm()
    form.properties_1.data = session.get('properties_1')
    form.properties_2.data = session.get('properties_2')
    form.properties_3.data = session.get('properties_3')
    if request.method == "POST":
        if form.validate_on_submit():
            db = get_db()
            user_id = session.get('user_id')
            gender = session.get('gender')
            age = session.get('age')
            address = session.get('address')
            background = session.get('background')
            properties_1 = form.properties_1.data
            properties_2 = form.properties_2.data
            properties_3 = form.properties_3.data
            wechat = form.wechat.data
            db.execute("""insert into user_main_after(user_id, gender, age, address,background,properties_1,
            properties_2,properties_3,wechat) values (%s, %s, %s, %s, %s, %s, %s, %s, %s)""",(user_id, gender, age, 
            address, background, properties_1, properties_2, properties_3,wechat))

            return redirect(url_for('ending'))
    return render_template('question.html',form=form)

#### ending page #####    
@app.route("/ending", methods=['GET','POST'])
def ending():
    
    return render_template('ending.html')


if __name__ == '__main__':
    app.run(debug = True)

