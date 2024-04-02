
export const checkTimeRange = (start, end, time)=>{
    let _time = new Date(time).getTime(); 
    let _start = start.getTime(); 
    let _end = end.getTime();
    if(_time>_end || _time<_start)
        return false;
    return true; 
}
