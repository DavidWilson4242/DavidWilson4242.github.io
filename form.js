function validatePhoneNumber(numberString) {
  var reg = /^\d{10}$/g;
  return numberString.replace(/-/g, "").match(reg) != undefined;
}

function dateToString(date) {
  return date.toTimeString().substr(0, 5);
}

function validateForm(total) {
  var lnameElem = $("input[name='lname']");
  var phoneElem = $("input[name='phone']");
  var stElem = $("input[name='street']");
  var cityElem = $("input[name='city']");

  var pud = $("input[name='p_or_d']:checked").val();
  var date = new Date();

  if (total <= 0) {
    return alert("Must purchase at least one item");
  }

  if (!validatePhoneNumber(phoneElem.val())) {
    return alert("Invalid phone number");
  }

  if (lnameElem.val() == "") {
    return alert("Last name is required");
  }

  if (pud == "delivery") {
    if (cityElem.val() == "") {
      return alert("Delivery requires a city");
    }
    if (stElem.val() == "") {
      return alert("Delivery requires a street address");
    }
    date.setMinutes(date.getMinutes() + 30);
  } else {
    date.setMinutes(date.getMinutes() + 15);
  }

  var finishTime = dateToString(date);

  document.write("Order successful!  Thank you for your order.<br>");
  document.write("Total cost: $" + total.toFixed(2) + "<br>");
  document.write("Order type: " + pud + "<br>");
  if (pud == "delivery") {
    document.write("Delivery ETA: " + finishTime + "<br>");
  } else {
    document.write("Ready for pickup at: " + finishTime + "<br>");
  }
    
}

function updateTotals(calculatedCosts) {
  
  var subElem   = $("#subtotal");
  var taxElem   = $("#tax");
  var totalElem = $("#total");

  var subtotal = 0.00;
  for (var i in calculatedCosts) {
    subtotal += calculatedCosts[i];
  }

  var tax = subtotal * 0.0625;
  var total = subtotal + tax;
  
  subElem.val(subtotal.toFixed(2));
  taxElem.val(tax.toFixed(2));
  totalElem.val(total.toFixed(2));

  return total;

}

window.addEventListener("load", function() {
  
  var costs = $("input[name='cost']");
  var calculatedCosts = [];
  var total = 0.00;

  for (var i = 0; i < menuItems.length; i++) {
    calculatedCosts[i] = 0.00;
  }

  for (let i in menuItems) {
    let name = "quan" + i;
    let selector = $("select[name='" + name + "']");
    selector.change(function() {
      var amount = parseInt(selector.val());
      if (amount == NaN) {
        $(costs[i]).val("");
        calculatedCosts[i] = 0.00;
      } else {
        var cost = menuItems[i].cost * amount;
        $(costs[i]).val(cost.toFixed(2));
        calculatedCosts[i] = cost;
      }
      total = updateTotals(calculatedCosts);
    });
  }

  $("form").submit(function(event) {
    event.preventDefault();
    validateForm(total);
  });

});
