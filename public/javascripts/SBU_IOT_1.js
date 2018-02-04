// to create different room option with different building//
function configureDropDownLists(ddl1,ddl2) {
    var freyhall = ['','Main Hall', '101', '102','201','202','203']; // each dropdown option is an array member
    var sac = ['','Hall', 'Ballroom A', 'Ballroom B'];
    var lighteng = ['','s10', 's11', 's12'];

    switch (ddl1.value) {
        case 'Frey Hall':
            ddl2.options.length = 0;
            for (i = 0; i < freyhall.length; i++) {
                createOption(ddl2, freyhall[i], freyhall[i]);
            }
            break;
        case 'Student Activity Center':
            ddl2.options.length = 0;
        for (i = 0; i < sac.length; i++) {
            createOption(ddl2, sac[i], sac[i]);
            }
            break;
        case 'Light Engineering':
            ddl2.options.length = 0;
            for (i = 0; i < lighteng.length; i++) {
                createOption(ddl2, lighteng[i], lighteng[i]);
            }
            break;
            default:
                ddl2.options.length = 0;
            break;
    }

};
// function to update the options

    function createOption(ddl, text, value) {
        var opt = document.createElement('option');
        opt.value = value;
        opt.text = text;
        ddl.options.add(opt);
    }
// end of configureDropDownLists





//When a new user is added, collect details, make it as an JSON object and send it to Node.js

  $( "#form_adduser" ).submit(function(event) {
      //event.preventDefault();
    var formData = $(this).serializeArray();
    var newuserdata={};
    formData.forEach(function(ele){
      newuserdata[ele.name]=ele.value;
    })

//alert(JSON.stringify(newuserdata));
newuserdata = (JSON.stringify(newuserdata));
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/endusers',
      data: newuserdata,
      success: function(msg){
       alert(JSON.stringify(newuserdata));

       },
      dataType: "json",
      contentType : "application/json"
    });

  });


//to delete one user

  $( "#form_deleteuser" ).submit(function(event) {
      //event.preventDefault();
    var formData = $(this).serializeArray();
    var newuserdata={};
    formData.forEach(function(ele){
      newuserdata[ele.name]=ele.value;
    })
    newuserdata=JSON.stringify(newuserdata);
//alert(newuserdata);
// newuserdata = (JSON.stringify(newuserdata));
    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:3000/endusers',
      data: newuserdata,
      success: function(msg){
       alert(JSON.stringify(newuserdata));

       },
      dataType: "json",
      contentType : "application/json"
    });

  });


//modify user

  $( "#form_modifyuser" ).submit(function(event) {
      //event.preventDefault();
    var formData = $(this).serializeArray();
    var newuserdata={};
    formData.forEach(function(ele){
      newuserdata[ele.name]=ele.value;
    })

// var newuserdata = {

//     "firstname": "venkat",
//     "lastname": "sentnow",
//     "usercategory": "bnbnbnbn",
//     "emailid": "venkat@chitr",
//     "sbuid": 123,
//     "gender": "male"

//   };
//alert(JSON.stringify(newuserdata));
newuserdata = (JSON.stringify(newuserdata));
    $.ajax({
      type: 'PUT',
      url: 'http://localhost:3000/endusers',
      data: newuserdata,
      success: function(msg){
      

       },
      dataType: "json",
      contentType : "application/json"
    });

  });

  //When a new device is added, collect details, make it as an JSON object and send it to Node.js

    $( "#form_adddevice" ).submit(function(event) {
        //event.preventDefault();
      var deviceData = $(this).serializeArray();
      var newdevicedata={};
      deviceData.forEach(function(ele){
        newdevicedata[ele.name]=ele.value;
      })

      var fav = [];
      $.each($("input[name='accessright']:checked"), function(){
          fav.push($(this).val());
      });
  newdevicedata['accessright']=fav;
  newdevicedata=JSON.stringify(newdevicedata);
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/devices',
        data: newdevicedata,
        success: function(msg){
          alert(JSON.stringify(msg));
         },
        dataType: "json",
        contentType : "application/json"
      });

    });
//remove device
    $( "#form_removedevice" ).submit(function(event) {
        //event.preventDefault();
      var deviceData = $(this).serializeArray();
      var newdevicedata={};
      deviceData.forEach(function(ele){
        newdevicedata[ele.name]=ele.value;
      })
newdevicedata=JSON.stringify(newdevicedata);
  //alert(newdevicedata);


      $.ajax({
        type: 'DELETE',
        url: 'http://localhost:3000/devices',
        data: newdevicedata,
        success: function(msg){
         
         },
        dataType: "json",
        contentType : "application/json"
      });

    });

    //update device
    
      
   $( "#form_modify" ).submit(function(event) {
        //event.preventDefault();
      var deviceData = $(this).serializeArray();
      var newdevicedata={};
      deviceData.forEach(function(ele){
        newdevicedata[ele.name]=ele.value;
      })

      var fav = [];
      $.each($("input[name='accessright']:checked"), function(){
          fav.push($(this).val());
      });
  newdevicedata['accessright']=fav;
  newdevicedata=JSON.stringify(newdevicedata);
  //alert(newdevicedata);


      $.ajax({
        type: 'PUT',
        url: 'http://localhost:3000/devices',
        data: newdevicedata,
        success: function(msg){
          // if(msg.data ==no error )
          // {alert( "Device Added : "+JSON.stringify(newdevicedata) );}
          // else {alert("could not add, try again "); }
         },
        dataType: "json",
        contentType : "application/json"
      });

    });

// to GET all users from database and to create a table

$('#existingusers').click(function(e){
  e.preventDefault();
  window.location.href="/endusers/list";

});
 

    //pop up add user page

    $("#adduser").click(function(e){
      e.preventDefault();
      window.location.href="/endusers/adduser";
  });

  //pop up modify user page

  $("#modifyuser").click(function(e){
    e.preventDefault();
    window.location.href="/endusers/modifyuser";
});

//pop up delete user page

$("#deleteuser").click(function(e){
  e.preventDefault();
  window.location.href="/endusers/deleteuser";
});

   //pop up add device page
   $("#adddevice").click(function(e){
    e.preventDefault();
    window.location.href="/devices/adddevice";
});

   //pop up add device page
   $("#existingdevices").click(function(e){
    e.preventDefault();
    window.location.href="/devices/list";
});
   //pop up add device page
   $("#modifydevice").click(function(e){
    e.preventDefault();
    window.location.href="/devices/modifydevice";
});
   //pop up add device page
   $("#removedevices").click(function(e){
    e.preventDefault();
    window.location.href="/devices/removedevice";
});


   //back button to main page
   $("#stonybrook1").click(function(e){
    e.preventDefault();
    window.location.href="/";
});

$( "#loginform" ).submit(function(event) {
  //event.preventDefault();
var deviceData = $(this).serializeArray();
var newdevicedata={};
deviceData.forEach(function(ele){
  newdevicedata[ele.name]=ele.value;
})

newdevicedata= JSON.stringify(newdevicedata);
//alert(newdevicedata);
$.ajax({
  type: 'POST',
  url: 'http://localhost:3000/users/login',
  data: newdevicedata,
  success: function(msg){
       
   }
  ,
  dataType: "json",
  contentType : "application/json"
});

});

//log out click


$('#logout').click(function(e){
  event.preventDefault();
  //window.location.href="/";
$.ajax({
type:'GET',
url:'http://localhost:3000/users/logout',

success:function(data){

  if (data == 'logout') {
    window.location.href = '/users/login';
 }

 }
}) ;
 
});