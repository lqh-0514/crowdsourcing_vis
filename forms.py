from flask_wtf import FlaskForm
from wtforms import TextField, IntegerField, TextAreaField, SubmitField, RadioField, SelectField,StringField
from wtforms import validators, ValidationError
from wtforms.validators import DataRequired
def validate_staff(form, field):
   if field.data == "":
      raise ValidationError("Not a valid choice")
class UserForm(FlaskForm):
   # name = TextField("Name Of Student",[validators.Required("Please enter your name.")])
   Gender = RadioField('性别', choices = [('M','男'),('F','女')],validators=[DataRequired('请填写一个选项')])
   Age = SelectField('年龄', choices=[('','---'),('0','10-17'),('1','18-30'),('2','31-45'),('3','45-60'),('4','60+')],validators=[validate_staff])
   Address = RadioField("是否（曾）在上海生活？", choices = [('T','是'),('F','否')], validators=[DataRequired('请填写一个选项')])
   Background = RadioField("是否（曾）有建筑、规划、景观等相关专业背景？", choices = [('T','有'),('F','无')], validators=[DataRequired('请填写一个选项')])
   text = StringField('您认为，哪些因素会影响您是否喜欢在一条街道活动?（请按主次顺序）')
   properties_1 = SelectField('properties', choices = [('','---'),('use', '街区功能（业态）是否丰富'),('age','新/历史风貌'),('type','房屋形态（例如有地标性或造型独特建筑）'),('stre','街道尺度（楼高街宽比）是否舒适'),('size','街区大小'),
      ('den','房屋密集或稀疏'),('scene','视觉丰富度（例如有沿街店面或通透性的围墙）'),('view','视野开敞度'),('wal','可步行性'),('fac','街道设施（例如座椅等）'),('act','开放的室外活动空间'),('gre','景观绿化')],validators=[validate_staff],default='')
   properties_2 = SelectField('properties', choices = [('','---'),('use', '街区功能（业态）是否丰富'),('age','新/历史风貌'),('type','房屋形态（例如有地标性或造型独特建筑）'),('stre','街道尺度（楼高街宽比）是否舒适'),('size','街区大小'),
      ('den','房屋密集或稀疏'),('scene','视觉丰富度（例如有沿街店面或通透性的围墙）'),('view','视野开敞度'),('wal','可步行性'),('fac','街道设施（例如座椅等）'),('act','开放的室外活动空间'),('gre','景观绿化')],validators=[validate_staff],default='')
   properties_3 = SelectField('properties', choices = [('','---'),('use', '街区功能（业态）是否丰富'),('age','新/历史风貌'),('type','房屋形态（例如有地标性或造型独特建筑）'),('stre','街道尺度（楼高街宽比）是否舒适'),('size','街区大小'),
      ('den','房屋密集或稀疏'),('scene','视觉丰富度（例如有沿街店面或通透性的围墙）'),('view','视野开敞度'),('wal','可步行性'),('fac','街道设施（例如座椅等）'),('act','开放的室外活动空间'),('gre','景观绿化')],validators=[validate_staff],default='')

   submit = SubmitField("提交问卷")
class PropertyForm(FlaskForm):
   
   text_left = StringField('left')
   text_right = StringField('right')
   text_left_video = StringField('left')
   text_right_video = StringField('right')
   submit = SubmitField("下一处场景")

class ConfirmForm(FlaskForm):
   text = StringField('您认为，哪些因素会影响您是否喜欢在一条街道活动?（请按主次顺序）')
   properties_1 = SelectField('properties', choices = [('','---'),('use', '街区功能（业态）是否丰富'),('age','新/历史风貌'),('type','房屋形态（例如有地标性或造型独特建筑）'),('stre','街道尺度（楼高街宽比）是否舒适'),('size','街区大小'),
      ('den','房屋密集或稀疏'),('scene','视觉丰富度（例如有沿街店面或通透性的围墙）'),('view','视野开敞度'),('wal','可步行性'),('fac','街道设施（例如座椅等）'),('act','开放的室外活动空间'),('gre','景观绿化')],validators=[validate_staff],default='')
   properties_2 = SelectField('properties', choices = [('','---'),('use', '街区功能（业态）是否丰富'),('age','新/历史风貌'),('type','房屋形态（例如有地标性或造型独特建筑）'),('stre','街道尺度（楼高街宽比）是否舒适'),('size','街区大小'),
      ('den','房屋密集或稀疏'),('scene','视觉丰富度（例如有沿街店面或通透性的围墙）'),('view','视野开敞度'),('wal','可步行性'),('fac','街道设施（例如座椅等）'),('act','开放的室外活动空间'),('gre','景观绿化')],validators=[validate_staff],default='')
   properties_3 = SelectField('properties', choices = [('','---'),('use', '街区功能（业态）是否丰富'),('age','新/历史风貌'),('type','房屋形态（例如有地标性或造型独特建筑）'),('stre','街道尺度（楼高街宽比）是否舒适'),('size','街区大小'),
      ('den','房屋密集或稀疏'),('scene','视觉丰富度（例如有沿街店面或通透性的围墙）'),('view','视野开敞度'),('wal','可步行性'),('fac','街道设施（例如座椅等）'),('act','开放的室外活动空间'),('gre','景观绿化')],validators=[validate_staff],default='')
   wechat = StringField('参与抽取10张百元天猫超市礼品卡，请留下您的微信号作为联系方式')
   submit = SubmitField("提交问卷")
