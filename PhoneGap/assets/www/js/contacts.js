$('#contatos').live("pagecreate", function() {
    var options = new ContactFindOptions();
    options.filter="Amanda";
    options.multiple=true;
    var fields = ["displayName", "phoneNumbers"];
    
    navigator.contacts.find(fields, onContactsSuccess, onError, options);
});

function onContactsSuccess(contacts) {
    var contactsStr = "";
    for (var i=0; i<contacts.length; i++) {
        console.log("#######" + contacts.length);
        contactsStr += "<li>" + contacts[i].displayName + ": " + contacts[i].phoneNumbers[0].value + "</li>";
    }
    
    $("#contactsList").append(contactsStr);
};
