function searchContacts() {
    var options = new ContactFindOptions();
    options.filter = $('#contactName').val();;
    options.multiple = true;
    var fields = ["displayName", "phoneNumbers"];
    
    navigator.contacts.find(fields, onContactsSuccess, onError, options);
    
    $("#popupContacts").popup('close');
};

function onContactsSuccess(contacts) {
    var contactsStr = "";
    for (var i=0; i<contacts.length; i++) {
        console.log("#######" + contacts.length);
        contactsStr += "<li class='contactItem'>" + contacts[i].displayName + ": " + contacts[i].phoneNumbers[0].value + "</li>";
    }
    
    $(".contactItem").remove();
    $("#contactsList").append(contactsStr);
};
