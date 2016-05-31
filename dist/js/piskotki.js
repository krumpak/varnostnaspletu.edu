

/*	Time Logger v2.0	*	Copyright (C) 2015  Gorazd Krumpak	*	GNU GPLv3*/
function _$(a){return document.getElementById(a)}function GetURL(){var a=window.location.href,b=a.indexOf("#");return b>1?CleanCurrentURL=a.substring(0,b):CleanCurrentURL=a,a}function WriteLocalStorage(a){localStorage.setItem("TimeLog",JSON.stringify(a))}function ReadLocalStorage(){var a=localStorage.getItem("TimeLog");return JSON.parse(a)}function LeadingZero(a){return 9>=a?"0"+a:a}function CurrentTime(){var a=new Date,b=LeadingZero(a.getDate())+". "+LeadingZero(a.getMonth()+1)+". "+a.getFullYear()+" "+LeadingZero(a.getHours())+":"+LeadingZero(a.getMinutes())+":00";return b.toString()}function DuplicateEntry(a){for(var b=ReadLocalStorage(),c="add",d=0;d<b.length;d++)b[d]==a&&(c="skip");return c}function AddLog(){var a=CurrentTime(),b=ReadLocalStorage();"add"==DuplicateEntry(a)&&(b.push(a),WriteLocalStorage(b))}function DeleteEntry(a){var b=ReadLocalStorage();b.splice(a,1);WriteLocalStorage(b);var c=GetURL();Reload(c)}function EchoTime(){var a=document.body,b=GetURL(),c=b.replace(/\?openlog/gi,""),d=ReadLocalStorage(),e="<style>";e+=" .sticky {height:100%; position:fixed; width:120px; left:0; top:0; z-index:100; border-top:0;}",e+=" button, span { color:black; font-size:15px; background-color:white; font-family:arial,sans-serif; position:absolute; width:90px; margin-left:20px; }",e+=" #table-data { margin-left:120px; width: 620px; }",e+=" input { width:320px;height:20px;font-size: 12px;margin:0;padding:0;border:0;background-color:black;color:yellow;cursor:text; }",e+=" span, .glyphicon, div, b, button { cursor:pointer; }",e+=" </style>",e+='<div class="sticky">',e+='<span class="btn btn-default" role="button" style="bottom:20px;" onclick="window.scrollTo(0, 0);">To Top</span>',e+='<button class="btn btn-default" type="submit" style="top:120px;" onClick=Reload(\''+c+"');>Close</button>",e+='<button class="btn btn-default" type="submit" style="top:170px;" onClick=CopyRawData();>Raw data</button>',e+='<button class="btn btn-default" type="submit" style="top:270px;" onClick=\'ClearTime();\'>Clear All</button>',e+='<span class="btn btn-default" role="button" style="top:20px;" onclick="window.scrollTo(0, document.body.scrollHeight);">To Bottom</span>',e+="</div>";var f='<div id="table-data"><table class="table table-bordered table-condensed table-striped" border="1">';if(null!=d)for(var g=0;g<d.length;g++){var h=d[g],i=h.indexOf(CommentString);if(i>0)var j=h.split(CommentString),k=j[0],l="<td title='Edit Comment' style='padding: 0 2px;'><div id='static"+g+"' onclick='AddComment("+g+");'>"+j[1]+" +</div><div id='change"+g+"' style='display:none;white-space:nowrap;'><input class='inline' title='Add Comment' type='text' id='input"+g+"' value='"+j[1]+"' maxlength='50' onkeypress='EnterComment(event, "+g+");'>&nbsp;<b class='inline' title='Save' onclick='SaveComment("+g+");'>&nbsp;&radic;&nbsp;</b>&nbsp;<b class='inline' title='Cancel' onclick='CancelComment("+g+");'>&nbsp;&#215;&nbsp;</b></div></td>";else var k=h,l="<td title='Add Comment' style='padding: 0 2px;min-width:330px;'><div id='static"+g+"' onclick='AddComment("+g+");'><div style='text-align:center'>+</div></div><div id='change"+g+"' style='display:none;white-space:nowrap;'><input class='inline' title='Add Comment' type='text' id='input"+g+"' value='' maxlength='50' onkeypress='EnterComment(event, "+g+");'>&nbsp;<b class='inline' title='Save' onclick='SaveComment("+g+");'>&nbsp;&radic;&nbsp;</b>&nbsp;<b class='inline' title='Cancel' onclick='CancelComment("+g+");'>&nbsp;&#215;&nbsp;</b></div></td>";f+="<tr>",f+="<td style='padding: 0 2px;'>"+(g+1)+".</td>",f+="<td title='Select All => copy&paste to Excel!' style='padding: 0 2px;'>"+k+"</td>",f+=l,f+="<td style='padding: 0 2px;' title='Delete current entry!'> <div style='padding: 0 10px;' onclick='DeleteEntry("+g+");'>&#10006;</div> </td>",f+="</tr>"}f+="</table></div>",a.innerHTML=e+f}function AddComment(a){_$("static"+a).style.display="none",_$("change"+a).style.display="block",_$("input"+a).focus(),_$("input"+a).select()}function SaveComment(a){var b=_$("input"+a).value;b=b.trim();var c=ReadLocalStorage(),d=c[a],e=d.indexOf(CommentString);if(e>0&&""!=b){var f=d.split(CommentString),g=f[0]+CommentString+b;c[a]=g,WriteLocalStorage(c),_$("static"+a).innerHTML=b+" +"}else if(e>0&&""==b){var f=d.split(CommentString),g=f[0];c[a]=g,WriteLocalStorage(c),_$("static"+a).innerHTML="<div style='text-align:center'>+</div>"}else if(0>e&&""!=b){var g=d+CommentString+b;c[a]=g,WriteLocalStorage(c),_$("static"+a).innerHTML=b+" +"}else _$("static"+a).innerHTML="<div style='text-align:center'>+</div>";_$("static"+a).style.display="block",_$("change"+a).style.display="none"}function CancelComment(a){_$("static"+a).style.display="block",_$("change"+a).style.display="none"}function EnterComment(a,b){var c=a.keyCode||a.which;13==c&&SaveComment(b),27==c&&CancelComment(b),a.shiftKey&&9==a.keyCode?(SaveComment(b),AddComment(b-1)):9==c&&(SaveComment(b),AddComment(b+1))}function CopyRawData(){var a=document.body,b=ReadLocalStorage();console.clear();var c='<div style="width:50%;text-align:center;margin: 5px auto;"><button class="btn btn-default" type="submit" onclick="EchoTime();">Close</button><br><textarea onClick="this.select();" style="width:100%;height:500px;background-color:white;overflow:auto;border:1px solid #ccc;">';if(null!=b)for(var d=0;d<b.length;d++){var e=b[d],f=e.indexOf(CommentString);if(f>0){var g=e.split(CommentString);c+=g[0]+"	"+g[1]+"\n"}else c+=e+"\n"}c=c.trim(),c+="</textarea></div>",a.innerHTML=c}function Reload(a){t1=window.setTimeout(function(){window.location.href=a},1e3)}function ClearTime(){localStorage.removeItem("TimeLog"),console.log("Clear DATA"),_$("table-data").innerHTML='<div class="alert alert-danger" role="alert">Close window/tab to avoid further logging!</div>'}function TimeLogger(){var a=GetURL();if(""!=a)if(a.search(/openlog/gi)>=6)EchoTime();else{if(null===localStorage.getItem("TimeLog")){var b=[];WriteLocalStorage(b)}AddLog(),document.write('<div style="position:fixed;bottom: 0;right:0;"><a href="'+a+'?openlog" target="_self" style="color:white;background-color:grey;padding:3px 6px;z-index:100;text-decoration:none;border-top-left-radius:3px;">Open Log</a></div>'),document.body.addEventListener("click",function(){AddLog()},!1),document.body.addEventListener("keypress",function(){AddLog()},!1);var c=document.getElementsByTagName("body")[0];c.onfocus=function(){AddLog()},c.onscroll=function(){AddLog()}}else console.log("No URL")}var CommentString=" ## ";TimeLogger();