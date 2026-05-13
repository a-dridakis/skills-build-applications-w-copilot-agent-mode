from djongo import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=50)
    class Meta:
        db_table = 'users'

class Team(models.Model):
    name = models.CharField(max_length=100)
    members = models.JSONField()
    class Meta:
        db_table = 'teams'

class Activity(models.Model):
    user = models.CharField(max_length=100)
    activity = models.CharField(max_length=100)
    duration = models.IntegerField()
    class Meta:
        db_table = 'activities'

class Leaderboard(models.Model):
    user = models.CharField(max_length=100)
    score = models.IntegerField()
    class Meta:
        db_table = 'leaderboard'

class Workout(models.Model):
    name = models.CharField(max_length=100)
    suggested_for = models.JSONField()
    class Meta:
        db_table = 'workouts'
