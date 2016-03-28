/**
 * Created by armaan on 2016-03-08.
 *
 * packages added:
 * - meteor add bootstrap
 * - meteor add email
 * - meteor add meteorhacks:ssr
 */

if (Meteor.isServer) {
    Meteor.startup(function () {
        // MAIL url. Preferably add through hosting provider's dashboard
        process.env.MAIL_URL = "";
        return Subscribers.remove({});
    });

    Meteor.methods({
        sendEmail: function(){
            Email.send({
                to: "dhir.armaan@gmail.com",
                from: "postmaster@armaandhir.com",
                subject: "mailgun test",
                text: "Testing the mailgun settings"
            });
        },

        sendEmailHTML: function(emailData){
            SSR.compileTemplate('htmlEmail', Assets.getText('EmailTemplate.html'));
            //emailData['doctype'] = '<!DOCTYPE html PUBLIC "-//w3c//dtd xhtml 1.0 transitional //en" "http://www.w3.org/tr/xhtml1/dtd/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml">';
            //emailData['footer'] = '<//html>';
            Email.send({
                to: emailData.email,
                from: "postmaster@armaandhir.com",
                subject: "mailgun test",
                html: SSR.render( 'htmlEmail', emailData )
            });
        },

        subscribeToMail: function(subscribeData){
            //Subscribers.insert({email: subscribeData.email, longitude: subscribeData.long, latitude: subscribeData.lat});
            var data = Subscribers.find({email: subscribeData.email}, {limit:1}).fetch();
            if(data.length === 0){
                Subscribers.insert({email: subscribeData.email});
            }
        }
    });
}