if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    "submit form": function(e) {
      e.preventDefault();
      var emailAdd = e.target.emailInput.value;
      var emailData = {
        email: emailAdd
      };
      // send email
      Meteor.call('sendEmailHTML', emailData);

      // subscribe users
      var subscribeData = {
        email: emailData.email
        //long: session.get('geoPosition').coords.longitude,
        //lat: session.get('geoPosition').coords.latitude
      };
      if(e.target.subscribe.checked) {
        Meteor.call('subscribeToMail', subscribeData);
      }

      e.target.emailInput.value = "";
      $('#emailModal').modal('hide');
    }
  });

  Template.hello.onRendered(function(){
    Meteor.setTimeout(function(){
      $('#emailModal').modal('show');
      //var geoPosition = navigator.geolocation.getCurrentPosition();
      //session.set('geoPosition', geoPosition);
    }, 2000);
  });

}
