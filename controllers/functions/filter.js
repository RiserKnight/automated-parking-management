exports.filter=(text)=>{
let filterText="";


for (let i = 0; i < text.length; i++) {
  const character = text[i];
  const aV = character.charCodeAt(0);
  if(aV>=48 && aV<=57)
  {
    filterText+=String.fromCharCode(aV);
  }
  else if(aV>=65 && aV<=90)
  {
    filterText+=String.fromCharCode(aV);
  }
  else if(aV>=97 && aV<=122)
  {
    filterText+=String.fromCharCode(aV-32);
  }
  
}

return filterText;
}