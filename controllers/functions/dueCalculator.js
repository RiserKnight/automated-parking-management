exports.calcDue=(lotCode,entryTime,exitTime)=>{
    let due=0,f=1,time=(exitTime-entryTime)/60000;

    if(lotCode=="srgm") f=1.1;
    else if(lotCode=="skkn")f=1.08;
    else if(lotCode=="pjr")f=1.05;
    else if(lotCode=="thln")f=1;

    if(time<60)due=50;
    else if(time<1440)due=(time/10)*f+50;
    else due=(time/1440)*f*150;

    return due.toFixed(2) ;
    }