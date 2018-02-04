$(document).ready(function(){
    $.ajax({
        type:'GET',
        url:'http://localhost:3000/devices',
        success:function(data){
         console.log(data);
         var all_users="";
         for(var i=0; i<data.length;i++)
         {
           var j=i+1;
         all_users ="<tr><th>"+j+"</th><th>"+data[i].buildingname+"</th> <th>"+data[i].room+"</th> <th>"+data[i].deviceid+"</th> <th>"+data[i].devicecategory+"</th> <th>"+data[i].accessright+"</th></tr>";
         $("#alldevicetable tbody").append(all_users);
         }
       }
     });
})