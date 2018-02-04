$(document).ready(function(){
    $.ajax({
        type:'GET',
        url:'http://localhost:3000/endusers',
        success:function(data){
         console.log(data);
         var all_users="";
         for(var i=0; i<data.length;i++)
         {
           var j=i+1;
         all_users ="<tr><th>"+j+"</th><th>"+data[i].firstname+"</th> <th>"+data[i].lastname+"</th> <th>"+data[i].usercategory+"</th> <th>"+data[i].emailid+"</th> <th>"+data[i].sbuid+"</th></tr>";
         $("#allusertable tbody").append(all_users);
         }
       }
     });
})