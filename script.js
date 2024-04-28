$('document').ready(()=>{

    $('#break-decrement').click(()=>{
        let breakLength = $('#break-label').text();
        if(breakLength > 1){
            breakLength--;
            $('#break-label').text(breakLength);
        }
    });
    $('#break-increment').click(()=>{
        let breakLength = $('#break-label').text();
        if(breakLength < 60){
            breakLength++;
            $('#break-label').text(breakLength);
        }
    });
    $('#session-decrement').click(()=>{
        let sessionLength = $('#session-label').text();
        if(sessionLength > 1){
            sessionLength--;
            $('#session-label').text(sessionLength);
            $('#time-left').text(sessionLength + ':00');
        }
    });
    $('#session-increment').click(()=>{
        let sessionLength = $('#session-label').text();
        if(sessionLength < 60){
            sessionLength++;
            $('#session-label').text(sessionLength);
            $('#time-left').text(sessionLength + ':00');
        }
    });

    let timer_status = 'stopped';
    let session_status = 'session';
    let interval;
    $('#start_stop').click(()=>{
        if(timer_status == 'stopped'){
            timer_status = 'running';
            let time = $('#time-left').text();
            let timeArray = time.split(':');
            let minutes = parseInt(timeArray[0]);
            let seconds = parseInt(timeArray[1]);
            let totalSeconds = minutes * 60 + seconds;
            let interval = setInterval(()=>{
                if(timer_status == 'running'){
                    totalSeconds--;
                    minutes = Math.floor(totalSeconds / 60);
                    seconds = totalSeconds % 60;
                    if(minutes < 10){
                        minutes = '0' + minutes;
                    }
                    if(seconds < 10){
                        seconds = '0' + seconds;
                    }
                    $('#time-left').text(minutes + ':' + seconds);
                    if(totalSeconds == 0){
                        if(session_status == 'session'){
                            session_status = 'break';
                            totalSeconds = parseInt($('#break-label').text()) * 60;
                            $('#timer-label').text('Break : ');
                            $('#timer').css('background-color', '#90D26D');
                        }else{
                            session_status = 'session';
                            totalSeconds = parseInt($('#session-label').text()) * 60;
                            $('#timer-label').text('Session : ');
                            $('#timer').css('background-color', '#153448');
                        }
                    }
                }else{
                    clearInterval(interval);
                }
            }, 1000);
        }else{
            clearInterval(interval);
            timer_status = 'stopped';
        }
    });

    $('#reset').click(()=>{
        clearInterval(interval);
        timer_status = 'stopped';
        session_status = 'session';
        $('#break-label').text(5);
        $('#session-label').text(25);
        $('#time-left').text('25:00');
        $('#timer-label').text('Session : ');
        $('#timer').css('background-color', '#153448');
    });
});