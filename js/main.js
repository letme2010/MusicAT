var gCurrentSoundIndex = 0;
var gCurrentBgIndex = 0;

function main() {

    initKey();

    var _jqBgMusicUl = $('#bg_music_list');

    $.each(gBgMusicList, function (n, aMusic) {
        var _jqMusicLi = $("<li>" + (n + 1) + "." + aMusic + "</li>");
        _jqMusicLi.addClass("list_li");
        _jqBgMusicUl.append(_jqMusicLi);
    });

    setCurrentBgIndex(0);

    var _jqSoundUl = $('#sound_list');
    $.each(gSoundList, function (n, aSound) {
        var _jqSoundLi = $("<li>" + (n + 1) + "." + aSound + "</li>");
        _jqSoundLi.addClass("list_li");
        _jqSoundUl.append(_jqSoundLi);
    });

    setCurrentSoundIndex(0);

}

function initKey() {
    KeyboardJS.on("o", function () {
        onSkipToLastSound();
    });

    KeyboardJS.on('p', function () {
        onSkipToNextSound();
    });

    KeyboardJS.on('j', function () {
        onPlaySoundClick();
    });

    KeyboardJS.on('q', function(){
        onSkipToLastBgMusic();
    });

    KeyboardJS.on('w', function(){
        onSkipToNextBgMusic();
    });

    KeyboardJS.on('f', function(){
        onPlayBgMusic();
    });

    KeyboardJS.on('space', function(){
        onPauseBgMusic();
    });

}

function onPauseBgMusic() {
    $('#bg_player')[0].pause();
}

function goOnBgMusic() {
    $('#bg_player')[0].play();
}

function onPlayBgMusic() {
    var audioName = gBgMusicList[gCurrentBgIndex];
    var _jqBgPlayer = $('#bg_player');
    _jqBgPlayer.attr('src', "./res/bg_music/" + audioName);
    _jqBgPlayer[0].volume = gBgMusicVolume;
    _jqBgPlayer[0].play();
    var index = (++gCurrentBgIndex) % gBgMusicList.length;
    setCurrentBgIndex(index);
}

function onSkipToLastBgMusic() {
    var index;
    if (0 == gCurrentBgIndex) {
        index = gBgMusicList.length - 1;
    } else {
        index = (--gCurrentBgIndex) % gBgMusicList.length;
    }
    setCurrentBgIndex(index);
}

function onSkipToNextBgMusic() {
    var index = (++gCurrentBgIndex) % gBgMusicList.length;
    setCurrentBgIndex(index);
}

function setCurrentBgIndex(aIndex) {
    gCurrentBgIndex = aIndex;
    onCurrentBgIndexChanged();
}

function onCurrentBgIndexChanged() {
    var _jqBgUl = $('#bg_music_list');

    $.each(_jqBgUl.children(), function (aIndex) {
        var _jqChild = $(_jqBgUl.children()[aIndex]);
        if (_jqChild.hasClass('current_li')) {
            _jqChild.removeClass('current_li');
        }
    });

    $(_jqBgUl.children()[gCurrentBgIndex]).addClass('current_li');
    $('#bg_music_list_scroll').scrollTop(20 * gCurrentBgIndex);
}

function setCurrentSoundIndex(aIndex) {
    gCurrentSoundIndex = aIndex;
    onCurrentSoundIndexChanged();
}

function onCurrentSoundIndexChanged() {
    var _jqSoundUl = $('#sound_list');
    $.each(_jqSoundUl.children(), function (aIndex) {
        var _jqChild = $(_jqSoundUl.children()[aIndex]);
        if (_jqChild.hasClass('current_li')) {
            _jqChild.removeClass('current_li');
        }
    });

    $(_jqSoundUl.children()[gCurrentSoundIndex]).addClass('current_li');
    $('#sound_list_scroll').scrollTop(20 * gCurrentSoundIndex);
}

function onSkipToLastSound() {
    var index;
    if (0 == gCurrentSoundIndex) {
        index = gSoundList.length - 1;
    } else {
        index = (--gCurrentSoundIndex) % gSoundList.length;
    }
    setCurrentSoundIndex(index);
}

function onSkipToNextSound() {
    var index = (++gCurrentSoundIndex) % gSoundList.length;
    setCurrentSoundIndex(index);
}

function onPlaySoundClick() {
    var audioName = gSoundList[gCurrentSoundIndex];
    var _jqSoundPlayer = $('#sound_player');
    _jqSoundPlayer.attr('src', "./res/sound/" + audioName);
    beforeSoundPlay(audioName);
    _jqSoundPlayer[0].play();
    afterSoundPlay(audioName);
    _jqSoundPlayer[0].volume = gSoundVolume;
    var index = (++gCurrentSoundIndex) % gSoundList.length;
    setCurrentSoundIndex(index);
}

function beforeSoundPlay(aAudioName) {
    if ("进入地下.wav" == aAudioName) {
        onPauseBgMusic();
    } else if ("回到地面.wav" == aAudioName) {
        onPauseBgMusic();        
    } else if ("时间暂停.wav" == aAudioName) {
        onPauseBgMusic();
    } else if ("死.wav" == aAudioName) {
        onPauseBgMusic();
    }
}

function afterSoundPlay(aAudioName) {
    if ("进入地下.wav" == aAudioName) {
        setTimeout(function(){onPlayBgMusic();}, 2000);
    } else if ("回到地面.wav" == aAudioName) {
        setTimeout(function(){onPlayBgMusic();}, 2000);   
    } else if ("解除暂停.wav" == aAudioName) {
        goOnBgMusic();
    } else if ("滿血回复.wav" == aAudioName) {
        setTimeout(function(){onPlayBgMusic();}, 1000);           
    } else if ("引擎启动.wav" == aAudioName) {
        setTimeout(function(){onPlayBgMusic();}, 2000);                   
    } else if ("小弟出场destory.wav" == aAudioName) {
        setTimeout(function(){onPlayBgMusic();}, 2000);                           
    }
}

function pathToFileName(aPath) {
    return aPath.substring(aPath.lastIndexOf('/') + 1, aPath.length);
}

/*call back*/
function onSoundStart() {
    // $('#bg_music_playing').html();
    var path = $('#sound_player').attr('src');
    $('#sound_playing').html("Playing >> " + pathToFileName(path));
}

function onSoundEnd() {
    $('#sound_playing').html("");    
}

function onBgMusicStart() {
    var path = $('#bg_player').attr('src');
    $('#bg_music_playing').html("Playing >> " + pathToFileName(path));
}

function onBgMusicEnd() {
    $('#bg_music_playing').html("");    
}

main();
