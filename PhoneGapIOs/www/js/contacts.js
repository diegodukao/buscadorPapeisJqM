function searchContacts() {
    var options = new ContactFindOptions();
    options.filter = $('#contactName').val();;
    options.multiple = true;
    var fields = ["displayName", "phoneNumbers"];
    
    navigator.contacts.find(fields, onContactsSuccess, onError, options);
    
    $("#popupContacts").popup('close');
};

function onContactsSuccess(contacts) {
    $(".contactItem").remove();
    
    if (contacts.length == 0){
        $("#contactsList").append("<li class='contactItem'>Nenhum contato encontrado.</li>")
    }
    else {
        for (var i=0; i<contacts.length; i++) {
            console.log("#######" + contacts.length);
            contactsStr = "<li class='contactItem'>" + contacts[i].displayName + ": " + contacts[i].phoneNumbers[0].value + "</li>";
            $("#contactsList").append(contactsStr);
        }
    }
};
