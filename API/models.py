from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models.signals import post_save,post_delete
from django.dispatch import receiver
from rest_framework.authtoken.models import Token 
from PIL import Image
from ckeditor.fields import RichTextField

class MyAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, email, username, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser=True
        user.save(using=self._db)
        return user

class Account(AbstractBaseUser, PermissionsMixin):
    email           =models.EmailField(verbose_name="email", max_length=60, unique="True")
    username        =models.CharField(max_length=30, unique="True")
    first_name      =models.CharField(max_length=60)
    last_name       =models.CharField(max_length=60)
    date_joined     =models.DateTimeField(verbose_name="date joined", auto_now_add=True)
    last_login      =models.DateTimeField(verbose_name="last login", auto_now=True)
    is_admin        =models.BooleanField(default="False")
    is_active       =models.BooleanField(default="True")
    is_staff        =models.BooleanField(default="False")
    is_superuser    =models.BooleanField(default="False")

    objects=MyAccountManager()

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['username']

    def __str__(self):
        return self.username
    def has_perm(self, perm, obj=None):
        return self.is_admin
    def has_module_perms(self, app_label):
        return True    

class prof(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    phoneNumber = models.CharField(max_length=40)

    def __str__(self):
        return self.user.username

class event(models.Model):
    name = models.CharField(max_length=20)
    date = models.DateField()

    def __str__(self):
        return self.name

class module(models.Model):
    name = models.CharField(max_length=20)
    prof = models.ManyToManyField(prof, blank=True)

    def __str__(self):
        return self.name

class category(models.Model):
    name = models.CharField(max_length=20)
    module = models.ForeignKey(module,on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "categories"

class level(models.Model):
    name = models.CharField(max_length=30)
    category = models.ForeignKey(category,on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Group(models.Model):
    teacher = models.ForeignKey(prof, null=True, blank=True, on_delete=models.SET_NULL)
    name = models.CharField(unique=True,blank=True,max_length=20,null=True)
    level = models.ForeignKey(level,on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class student(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    first_name = models.CharField(max_length=25,null=True, blank=True)
    last_name = models.CharField(max_length=25,null=True, blank=True)
    profession = models.CharField(max_length=80,null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    phone_number = models.CharField(max_length=60, null=True)
    profileImage = models.ImageField(null=True, blank=True)
    groups = models.ManyToManyField(Group, blank=True)

    def __str__(self):
        return self.user.email



def upload_path(instance, filename):
    return '/'.join(['covers', str(instance.user.username), filename])

class payment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    receit = models.ImageField(blank=True, null=True, upload_to=upload_path)

    def __str__(self):
        return self.user.username


class Unit(models.Model):
    name=models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Lesson(models.Model):
    groups = models.ManyToManyField(Group)
    locked = models.ManyToManyField(Group, blank=True, related_name="locked_lessons")
    unit = models.ForeignKey(Unit, null=True,on_delete=models.SET_NULL)
    title = models.CharField(max_length=100)
    content = models.TextField()
    video = models.FileField(upload_to='video_lessons')
    date_created=models.DateTimeField(auto_now_add=True, null=True)
        
    def __str__(self):
        return self.title


# Trying images
class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    image = models.ImageField(upload_to='post_images')
    
    def __str__(self):
        return self.title

class Home_Slideshow(models.Model):
    title_English = models.CharField(max_length=100, null=True)
    content_English = models.TextField(null=True)
    title_French = models.CharField(max_length=100, null=True)
    content_French = models.TextField(null=True)
    title_Arabic = models.CharField(max_length=100, null=True)
    content_Arabic = models.TextField(null=True)


    image = models.ImageField(upload_to='Home Slideshow')
    
    def __str__(self):
        return self.title_English

    class Meta:
        verbose_name_plural = "Home Slideshow"

class English_Slideshow(models.Model):
    title_English = models.CharField(max_length=100, null=True)
    content_English = models.TextField(null=True)
    title_French = models.CharField(max_length=100, null=True)
    content_French = models.TextField(null=True)
    title_Arabic = models.CharField(max_length=100, null=True)
    content_Arabic = models.TextField(null=True)

    image = models.ImageField(upload_to='English Slideshow')
    
    def __str__(self):
        return self.title_English

    class Meta:
        verbose_name_plural = "English Slideshow"

    def save(self, *args, **kwargs):
      super().save(*args, **kwargs)  # saving image first

      img = Image.open(self.image.path) # Open image using self

      if img.height > 500 or img.width > 1000:
          new_img = (1000, 500)
          img.thumbnail(new_img)
          img.save(self.image.path) 

class Services_Slideshow(models.Model):
    title_English = models.CharField(max_length=100, null=True)
    content_English = models.TextField(null=True)
    title_French = models.CharField(max_length=100, null=True)
    content_French = models.TextField(null=True)
    title_Arabic = models.CharField(max_length=100, null=True)
    content_Arabic = models.TextField(null=True)

    image = models.ImageField(upload_to='Services Slideshow')
    
    def __str__(self):
        return self.title_English

    class Meta:
        verbose_name_plural = "Services Slideshow"

    def save(self, *args, **kwargs):
      super().save(*args, **kwargs)  # saving image first

      img = Image.open(self.image.path) # Open image using self

      if img.height > 500 or img.width > 1000:
          new_img = (1000, 500)
          img.thumbnail(new_img)
          img.save(self.image.path) 

class Training_Slideshow(models.Model):
    title_English = models.CharField(max_length=100, null=True)
    content_English = models.TextField(null=True)
    title_French = models.CharField(max_length=100, null=True)
    content_French = models.TextField(null=True)
    title_Arabic = models.CharField(max_length=100, null=True)
    content_Arabic = models.TextField(null=True)

    image = models.ImageField(upload_to='Training Slideshow')
    
    def __str__(self):
        return self.title_English

    class Meta:
        verbose_name_plural = "Training Slideshow"

    def save(self, *args, **kwargs):
      super().save(*args, **kwargs)  # saving image first

      img = Image.open(self.image.path) # Open image using self

      if img.height > 500 or img.width > 1000:
          new_img = (1000, 500)
          img.thumbnail(new_img)
          img.save(self.image.path) 

class English_Cards(models.Model):
    title_English = models.CharField(max_length=100, null=True)
    description_English = models.TextField(null=True)
    content_English=RichTextField(blank=True, null=True)

    title_French = models.CharField(max_length=100, null=True)
    description_French = models.TextField(null=True)
    content_French=RichTextField(blank=True, null=True)

    title_Arabic= models.CharField(max_length=100, null=True)
    description_Arabic = models.TextField(null=True)
    content_Arabic=RichTextField(blank=True, null=True)

    image = models.ImageField(upload_to='English Cards')
    cover_image = models.ImageField(upload_to='English Cards', null=True)
    
    def __str__(self):
        return self.title_English

    class Meta:
        verbose_name_plural = "English"

    def save(self, *args, **kwargs):
      super().save(*args, **kwargs)  # saving image first

      img = Image.open(self.image.path) # Open image using self

      if img.height > 500 or img.width > 500:
          new_img = (500, 500)
          img.thumbnail(new_img)
          img.save(self.image.path) 

      cov_img = Image.open(self.cover_image.path) # Open image using self  
      if cov_img.height > 500 or cov_img.width > 1000:
          new_cov_img = (1000, 500)
          cov_img.thumbnail(new_cov_img)
          cov_img.save(self.cover_image.path) 

class Services_Cards(models.Model):
    title_English = models.CharField(max_length=100, null=True)
    description_English = models.TextField(null=True)
    content_English=RichTextField(blank=True, null=True)

    title_French = models.CharField(max_length=100, null=True)
    description_French = models.TextField(null=True)
    content_French=RichTextField(blank=True, null=True)

    title_Arabic= models.CharField(max_length=100, null=True)
    description_Arabic = models.TextField(null=True)
    content_Arabic=RichTextField(blank=True, null=True)

    image = models.ImageField(upload_to='Services')
    cover_image = models.ImageField(upload_to='Services', null=True)
    
    def __str__(self):
        return self.title_English

    class Meta:
        verbose_name_plural = "Services"

    def save(self, *args, **kwargs):
      super().save(*args, **kwargs)  # saving image first

      img = Image.open(self.image.path) # Open image using self

      if img.height > 500 or img.width > 500:
          new_img = (500, 500)
          img.thumbnail(new_img)
          img.save(self.image.path) 

      cov_img = Image.open(self.cover_image.path) # Open image using self  
      if cov_img.height > 500 or cov_img.width > 1000:
          new_cov_img = (1000, 500)
          cov_img.thumbnail(new_cov_img)
          cov_img.save(self.cover_image.path) 

class Tag(models.Model):
  name=models.CharField(max_length=200, null=True)

  def __str__(self):
    return self.name

class Training_Cards(models.Model):
    tag = models.ForeignKey(Tag, null=True, on_delete=models.SET_NULL)

    title_English = models.CharField(max_length=100, null=True)
    description_English = models.TextField(null=True)
    content_English=RichTextField(blank=True, null=True)

    title_French = models.CharField(max_length=100, null=True)
    description_French = models.TextField(null=True)
    content_French=RichTextField(blank=True, null=True)

    title_Arabic= models.CharField(max_length=100, null=True)
    description_Arabic = models.TextField(null=True)
    content_Arabic=RichTextField(blank=True, null=True)

    image = models.ImageField(upload_to='Training')
    cover_image = models.ImageField(upload_to='Training', null=True)
    
    def __str__(self):
        return self.title_English

    class Meta:
        verbose_name_plural = "Training"

    def save(self, *args, **kwargs):
      super().save(*args, **kwargs)  # saving image first

      img = Image.open(self.image.path) # Open image using self

      if img.height > 500 or img.width > 500:
          new_img = (500, 500)
          img.thumbnail(new_img)
          img.save(self.image.path) 

      cov_img = Image.open(self.cover_image.path) # Open image using self  
      if cov_img.height > 500 or cov_img.width > 1000:
          new_cov_img = (1000, 500)
          cov_img.thumbnail(new_cov_img)
          cov_img.save(self.cover_image.path) 


class Email(models.Model):
    email = models.CharField(max_length=100) 
    test1 = models.BooleanField(default=False)
    test2 = models.BooleanField(default=False)
    test3 = models.BooleanField(default=False)
    def __str__(self):
        return self.email


# @receiver(post_save,sender=Account)
# def createToken(sender,instance=None,created=None,**kwargs):
#     if created:
#         Token.objects.create(account=instance)
   


        

