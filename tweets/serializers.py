from rest_framework import serializers
from .models import Tweet
from django.conf import settings 

MAX_TWEET_LENGTH = settings.MAX_TWEET_LENGTH
TWEET_ACTION_OPTIONS = settings.TWEET_ACTION_OPTIONS


class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(required=False, allow_blank = True)

    def validate_action(self, value):
        value = value.lower().strip() # "Like " -> "like"
        if not value in TWEET_ACTION_OPTIONS:
            raise serializers.ValidationError("This is not a valid action for tweets")
        return value
 


class TweetCreateSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)

    def get_likes(self, obj):
        return obj.likes.count()

    def validate_content(self, value):
        if len(value) > MAX_TWEET_LENGTH:
            raise forms.ValidationError("This tweet is too long")
        return value

    class Meta:
        model = Tweet
        fields = ['id', 'content','likes']
  

class TweetSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    parent = TweetCreateSerializer(read_only=True)
  # idont need to call a srllizalixer method for  propety that is in the object itseelf 

    class Meta:
        model = Tweet
        fields = ['id', 'content','likes','is_retweet','parent']

    def get_likes(self, obj):
        return obj.likes.count()


 

  
