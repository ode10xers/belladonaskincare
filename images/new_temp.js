function getCurrentURLParameters() {
  const params = {};
  const searchParams = new URL(window.location.href).searchParams;

  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  return params;
}
const url_params = getCurrentURLParameters();
var leadCapture;
var service = null;
var selected_service_card = null;
var selected_service_price = null;

const isNullUndefEmptyStr = (objec) =>
  Object.values(objec).every((value) => value === "");

removeNameError = (evt) => {
  document.getElementById("phone_error").textContent = "";
  document.getElementById("name_error").textContent = "";
  document.getElementById("radio_error").textContent = "";
};

onlyNumberKey = (input) => {
  const phoneNumber = input.value;
  const numericStringExceptFormateCharacter = phoneNumber.replace(
    /[^\d()+\s-]/g,
    ""
  );
  input.value = numericStringExceptFormateCharacter;
  const numericString = phoneNumber.replace(/\D/g, "");
  if (numericString.length > 10) {
    if (numericString == phoneNumber && startsWithOneOrZero(numericString)) {
      input.value = phoneNumber.slice(0, 11);
    } else if (numericString == phoneNumber) {
      input.value = phoneNumber.slice(0, 10);
    } else if (
      numericString.length >= 12 &&
      startsWithOneOrZero(numericString)
    ) {
      input.value = phoneNumber.slice(0, phoneNumber.length - 1);
    } else if (
      numericString.length === 11 &&
      !startsWithOneOrZero(numericString)
    ) {
      input.value = phoneNumber.slice(0, phoneNumber.length - 1);
    }
    document.getElementById("phone_error").textContent =
      "No more digits allowed!";
    setTimeout(() => {
      document.getElementById("phone_error").textContent = "";
    }, 1500);
    return false;
  } else {
    document.getElementById("phone_error").textContent = "";
  }
};

function startsWithOneOrZero(number) {
  const numberStr = number.toString();
  return numberStr[0] === "1" || numberStr[0] === "0";
}

document
  .querySelector("input[name='cust_type']")
  ?.addEventListener("click", () => {
    document.getElementById("radio_error").textContent = "";
  });

let submitted = false;
const dropdownElementCheck = document.querySelector("#dropdown");
const messageElementCheck = document.querySelector("#message");
const emailElementCheck = document.querySelector("#email");
const checkboxElementCheck = document.querySelector("#checkbox-input");
const professionalEleCheck = document.querySelector(".team-input");
let dropdown_element_display;
let message_element_display;
let profess_element_display;
let email_element_display;
let checkbox_display;
if (dropdownElementCheck) {
  dropdown_element_display = dropdownElementCheck.parentElement.style.display;
}
if (messageElementCheck) {
  message_element_display = messageElementCheck.parentElement.style.display;
}
if (professionalEleCheck) {
  let computedProfStyle = window.getComputedStyle(professionalEleCheck);
  profess_element_display = computedProfStyle.getPropertyValue("display");
}
if (emailElementCheck) {
  email_element_display = emailElementCheck.parentElement.style.display;
}
if (checkboxElementCheck) {
  checkbox_display = checkboxElementCheck.parentElement.style.display;
}

leadCapture = function () {
  event.preventDefault();
  let dropdownEle = document.querySelector("#dropdown");
  let messageEle = document.querySelector("#message");
  let emailEle = document.querySelector("#email");
  let checkboxEle = document.querySelector("#checkbox-input");
  let firstNameEle = document.querySelector("#username");
  let lastNameEle = document.querySelector("#userLastName");
  let addressEle = document.querySelector("#address");
  let professionalEle = document.querySelector("#team");
  let phoneEle = document.querySelector("#phone");
  var activeTypeBtn = document.querySelector(".type-btn.active");
  var customer_type = activeTypeBtn ? activeTypeBtn.getAttribute("value") : "";
  let userCountryParent = document.getElementById("country");
  var userCountry = userCountryParent.querySelector("span").innerText;

  let phone = phoneEle ? phoneEle.value : "";
  let professional = professionalEle ? professionalEle.value : "";
  let dropdownValue = dropdownEle ? dropdownEle.value : "";
  let messageValue = messageEle ? messageEle.value : "";
  let emailValue = emailEle ? emailEle.value : "";
  let checkboxChecked = checkboxEle ? checkboxEle.checked : false;
  let firstName = firstNameEle ? firstNameEle.value : "";
  let lastName = lastNameEle ? lastNameEle.value : "";
  let address = addressEle ? addressEle.value : "";
  mixpanel.track("submit-btn", {
    category: "contact-form",
    biz_name: biz_name,
    place_id: place_id,
    uid: uid,
    paid: paid,
    first_name: firstName,
    last_name: lastName,
    address: address,
    professional: professional,
    phone: phone,
    country_code: userCountry,
    email: emailValue,
    customer_type: customer_type,
    message_val: messageValue,
    service: dropdownValue,
    subscribe_text_message: checkboxChecked,
    cohort_user_id: cohort_user_id,
    client_id: client_id,
    user_utm_source: user_utm_source,
  });
  console.log("submit btn clicked!");
  var activeTypeBtn = document.querySelector(".type-btn.active");
  var cust_type = activeTypeBtn ? activeTypeBtn.getAttribute("value") : "";
  var subscribe_for_text_message = "No";
  let checkedMarked = document.getElementById("checkbox-input").checked;
  if (checkedMarked) {
    subscribe_for_text_message = "Yes";
  }
  const host = window.location.origin;

  function checkNumberLength(phoneNumber) {
    const numericString = phoneNumber.replace(/\D/g, "");
    if (startsWithOneOrZero(numericString)) {
      if (numericString.length !== 11) {
        return true;
      }
    } else {
      if (numericString.length !== 10) {
        return true;
      }
    }
    return false;
  }

  const usernameInput = document.querySelector("#username").value;
  if (phone.length <= 0 && usernameInput.length <= 0) {
    mixpanel.track("submit-btn-error", {
      category: "contact-form",
      biz_name: biz_name,
      place_id: place_id,
      uid: uid,
      paid: paid,
      first_name: firstName,
      last_name: lastName,
      address: address,
      professional: professional,
      phone: phone,
      country_code: userCountry,
      email: emailValue,
      customer_type: customer_type,
      message_val: messageValue,
      service: dropdownValue,
      cohort_user_id: cohort_user_id,
      client_id: client_id,
      user_utm_source: user_utm_source,
      subscribe_text_message: checkboxChecked,
      error: "phone_error or name_error  or radio_error",
    });
    document.getElementById("phone_error").textContent =
      "Please enter a valid number!";
    document.getElementById("radio_error").textContent =
      "Please select a value!";
    document.getElementById("name_error").textContent =
      "Please enter your name!";
    return;
  }
  const usernameValue = document.querySelector("#username").value;
  if (usernameValue.length <= 0) {
    mixpanel.track("submit-btn-error", {
      category: "contact-form",
      biz_name: biz_name,
      place_id: place_id,
      uid: uid,
      paid: paid,
      first_name: firstName,
      last_name: lastName,
      address: address,
      professional: professional,
      phone: phone,
      country_code: userCountry,
      email: emailValue,
      customer_type: customer_type,
      message_val: messageValue,
      service: dropdownValue,
      cohort_user_id: cohort_user_id,
      client_id: client_id,
      user_utm_source: user_utm_source,
      subscribe_text_message: checkboxChecked,
      error: "name_error",
    });
    document.getElementById("name_error").textContent =
      "Please enter your name!";
    return;
  }
  var emailElement = document.getElementById("email_error");
  var emailInput = document.getElementById("email");
  if (emailElement && emailInput.value === "") {
    mixpanel.track("submit-btn-error", {
      category: "contact-form",
      biz_name: biz_name,
      place_id: place_id,
      uid: uid,
      paid: paid,
      first_name: firstName,
      address: address,
      professional: professional,
      last_name: lastName,
      phone: phone,
      email: emailValue,
      country_code: userCountry,
      customer_type: customer_type,
      message_val: messageValue,
      service: dropdownValue,
      cohort_user_id: cohort_user_id,
      client_id: client_id,
      user_utm_source: user_utm_source,
      subscribe_text_message: checkboxChecked,
      error: "email_error",
    });
    emailElement.textContent = "Please enter your email!";
    return;
  }

  if (checkNumberLength(document.getElementById("phone").value)) {
    mixpanel.track("submit-btn-error", {
      category: "contact-form",
      biz_name: biz_name,
      place_id: place_id,
      uid: uid,
      paid: paid,
      first_name: firstName,
      country_code: userCountry,
      last_name: lastName,
      address: address,
      professional: professional,
      phone: phone,
      email: emailValue,
      customer_type: customer_type,
      message_val: messageValue,
      service: dropdownValue,
      cohort_user_id: cohort_user_id,
      client_id: client_id,
      user_utm_source: user_utm_source,
      subscribe_text_message: checkboxChecked,
      error: "phone_error",
    });
    document.getElementById("phone_error").textContent =
      "Please enter a valid number!";
    return;
  }

  const show_intrested_service_card= document.getElementById("service-card__interested")?true:false;
  if (submitted && !show_intrested_service_card) {
    console.log("multiple submits not allowed");
    return;
  }
  submitted = true;
  const spinLoader = document.getElementById("cover-spin");
  if (spinLoader) spinLoader.style.display = "block";

  //Loader and arrow
  let arrowIcon = document.getElementById("arrowIcon");
  let animSpinLoader = document.getElementById("loader");
  if (animSpinLoader) {
    animSpinLoader.style.display = "block";
    if (arrowIcon) {
      document.querySelector(".submitBtn svg").style.display = "none";
      arrowIcon.style.animation =
        "arrowTransition 1500ms cubic-bezier(0.42, 0, 0.78, 1)";
    }

    setTimeout(function () {
      if (arrowIcon) arrowIcon.style.display = "none";
      if (animSpinLoader) animSpinLoader.style.display = "block";

      if (arrowIcon) arrowIcon.style.animation = "";
    }, 1000);
  }

  if (!cust_type) {
    cust_type = "Not Selected";
  }

  document.getElementById("submit").value = "Please Wait ...";
  localstorage_client_data = {
    first_name: firstName,
    last_name: lastName,
    phone: phone,
    customer_type: cust_type,
    country_code: userCountry,
  };

  cookies_client_data = {
    name: firstName + " " + lastName,
    phone: phone,
    customer_type: cust_type,
  };
  localStorage.setItem("user_data", JSON.stringify(localstorage_client_data));
  setCookie("_chrone", JSON.stringify(cookies_client_data), 1);
  let validPhoneNumber = phone.replace(/\D/g, "");
  if (/^[01]/.test(validPhoneNumber)) {
    validPhoneNumber = validPhoneNumber.slice(1);
  }
  const data = {
    form_data: {
      first_name: firstName,
      last_name: lastName,
      phone: validPhoneNumber,
      address: address,
      country_code: userCountry,
      page_type: page_type,
    },
    repeat_customer: cust_type,
    selected_service: selected_service_card,
    service_price: selected_service_price,
    url: host,
    initial_referrer: initial_referrer,
    place_id: place_id,
    uid: uid,
  };
  setCookie("_chrone", JSON.stringify(cookies_client_data), 365);
  if (dropdown_element_display !== "none" && service === null) {
    let selectedValue = dropdown.options[dropdown.selectedIndex].value;
    service = selectedValue;
    let selectedPrice = dropdown.options[dropdown.selectedIndex].dataset.price;
    if (selectedPrice) {
      data.service_price = selectedPrice;
    }
    data.form_data.service = service;
  }
  let service_category = document.getElementById(
    "service_category_ele"
  )?.textContent;
  if (service_category) {
    data.service_category = service_category;
    data.form_data.service_category = service_category;
  }

  if (message_element_display !== "none") {
    let message = document.getElementById("message").value;
    if (message === "") {
      message = "No message";
    }
    data.form_data.message = message;
  }
  if (email_element_display !== "none") {
    let email = document.getElementById("email").value;
    if (email === "") {
      email = "Not given";
    }
    data.form_data.email = email;
  }

  if (profess_element_display !== "none") {
    let professELe = document.getElementById("team");
    let profess = "Not Selected";
    if (professELe) {
      profess = professELe.value;
    }
    if (profess && profess === "") {
      profess = "Not Selected";
    }
    data.form_data.professional = profess;
  }

  if (checkbox_display !== "none") {
    let subscribe_text_message = "No";
    let checked = document.getElementById("checkbox-input").checked;
    if (checked) {
      subscribe_text_message = "Yes";
    }
    data.form_data.subscribe_text_message = subscribe_text_message;
  }
  data.utm_source = url_params?.utm_source;

  let shareExperienceMsgEle = document.getElementById("client_name_msg");
  if (shareExperienceMsgEle) {
    shareExperienceMsgEle.innerText += " " + firstName;
  }
  data.url_params = url_params;
  fetch(`${server_name}/send-lead-sms-landingpage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((res) => {
    localStorage.setItem("user_data_id", res.id);
      mixpanel.track("lead-converted", {
        category: "lead-gen-form",
        biz_name: biz_name,
        place_id: place_id,
        uid: uid,
        paid: paid,
        first_name: firstName,
        last_name: lastName,
        country_code: userCountry,
        professional: professional,
        address: address,
        phone: phone,
        customer_type: cust_type,
        service: service,
        subscribe_for_text_message: subscribe_for_text_message,
        cohort_user_id: cohort_user_id,
        client_id: client_id,
        user_utm_source: user_utm_source,
      });

      if (fb_pixel_id) {
        fbq("track", "Lead", { content_name: biz_name });
      }
    
      if(show_intrested_service_card){
        const card = document.getElementById("service-card__interested");
        if(card) card.style.display = "block";
        const formInputFieldWrapper = document.querySelector(".input_fields_wrapper");
        if(formInputFieldWrapper) formInputFieldWrapper.style.display = "none";
        const submitBtn = document.getElementById("service_selection_submit_btn");
        if(submitBtn){
        submitBtn.addEventListener('click',(e)=>{
          e.preventDefault();
          sendModifiedData({...data,id:res.id})
          card.style.display = "none";
          showFinalCard(false);  //false means servcie card to final card
        })
      }
      }else{
        //true-> form to final card
        showFinalCard(true);
      }
      let spinLoader = document.getElementById("cover-spin");
      if (spinLoader) spinLoader.style.display = "none";
      document.getElementById("submit").value = "Submit";
    })
    .catch((e) => {
      if (uid === "de2bc566-f554-4365-9f0e-3a1d0c144048") {
        window.location.href = `${host}/thankyou`;
      }
      if (
        booking_link !== null &&
        booking_link !== undefined &&
        booking_link.trim() !== "" &&
        booking_link !== "None"
      ) {
        if (booking_link_redirection === "False") {
          messageWithoutBookingLink();
        } else {
          messageWithBookingLink();
        }
      } else {
        messageWithoutBookingLink();
      }
      document.querySelector(".contact-form p").style.display = "none";
      document.querySelector(".contact-form .timelyForm").style.display =
        "none";
      document.querySelector(".contact-form h2").style.textAlign = "center";
      if (spinLoader) spinLoader.style.display = "none";

      document.getElementById("submit").value = "Submit";
      console.log("success");

      mixpanel.track("lead-converted-error", {
        category: "lead-gen-form",
        biz_name: biz_name,
        place_id: place_id,
        uid: uid,
        paid: paid,
        first_name: firstName,
        last_name: lastName,
        address: address,
        country_code: userCountry,
        professional: professional,
        phone: phone,
        customer_type: cust_type,
        subscribe_for_text_message: subscribe_for_text_message,
        service: service,
        cohort_user_id: cohort_user_id,
        client_id: client_id,
        user_utm_source: user_utm_source,
        error: e.responseJSON,
        errortype: typeof e,
        errorkeys: Object.keys(e).join(", "),
        errorBare: e,
        source: "new_temp.js",
      });
    });
};

function showFinalCard(isFormToFinalCard){
  if (uid === "de2bc566-f554-4365-9f0e-3a1d0c144048") {
    window.location.href = `${host}/thankyou`;
  }
  
  if (
    booking_link !== null &&
    booking_link !== undefined &&
    booking_link.trim() !== "" &&
    booking_link !== "None"
  ) {
    if (dead === "True" || lead_mask === "True") {
      document.querySelector(".contact-form h2").innerHTML =
        form_no_booking_link_message;
    } else {
      if (booking_link_redirection === "False") {
        messageWithoutBookingLink();
      } else {
        messageWithBookingLink();
      }
    }
  } else {
    if (dead === "True" || lead_mask === "True") {
      document.querySelector(".contact-form h2").innerHTML =
        form_no_booking_link_message;
    } else {
      messageWithoutBookingLink();
    }
  }

  if(isFormToFinalCard){
    const desc = document.querySelector(".contact-form p");
      if(desc)desc.style.display = "none";
    const form = document.querySelector(".contact-form .timelyForm");
      if(form)form.style.display = "none";
  }
  const formTitle = document.querySelector(".contact-form h2")
  if(formTitle)formTitle.style.textAlign = "center";
}

function messageWithoutBookingLink() {
  let ecData = getCookie("_chrone");
  let clientType;
  if (ecData) {
    ecData = JSON.parse(ecData);
    clientType = ecData.customer_type;
  }
  if (clientType == "Returning Client" && place_id && place_id !== "None") {
    document.getElementsByClassName("input_fields_wrapper")[0].style.display =
      "none";
    document.getElementsByClassName(
      "review_link_redirection_container"
    )[0].style.display = "block";
    setTimeout(() => {
      mixpanel.track("redirect-to-review", {
        category: "lead-gen-form",
        biz_name: biz_name,
        place_id: place_id,
        uid: uid,
        cohort_user_id: cohort_user_id,
        client_id: client_id,
        user_utm_source: user_utm_source,
        redirect: "auto-redirect",
        source: "new_temp.js",
      });
      window.location.href = review_link;
    }, 3000);
  } else {
    document.querySelector(".contact-form h2").innerHTML =
      form_no_booking_link_message;
    var p = document.createElement("p");
    p.innerHTML = form_submition_msg;
    p.style.fontSize = "20px";
    p.style.textAlign = "center";
    p.style.maxWidth = "100%";
    var div = document.createElement("div");
    div.appendChild(p);
    document.querySelector(".contact-form").appendChild(div);
  }
}

function messageWithBookingLink() {
  document.querySelector(".contact-form h2").innerHTML =
    form_booking_redirection_message;
  var div = document.createElement("div");
  div.style.display = "flex";
  div.style.justifyContent = "center";
  div.style.flexDirection = "column";
  var p = document.createElement("p");
  p.innerHTML = form_booking_link_not_redirection_fallback;
  p.style.fontSize = "20px";
  p.classList = "click-link-msg";
  p.style.textAlign = "center";
  p.style.maxWidth = "100%";
  var a = document.createElement("a");
  a.href = booking_link;
  a.target = "_blank";
  a.innerHTML = booking_link;
  a.style.fontSize = "18px";
  a.style.overflowWrap = "anywhere";
  a.style.textAlign = "center";
  div.appendChild(p);
  div.appendChild(a);
  document.querySelector(".contact-form").appendChild(div);
  setTimeout(() => {
    window.location.href = booking_link;
  }, 2000);
}

function redirectToReview() {
  mixpanel.track("redirect-to-review", {
    category: "lead-gen-form",
    biz_name: biz_name,
    place_id: place_id,
    uid: uid,
    cohort_user_id: cohort_user_id,
    client_id: client_id,
    user_utm_source: user_utm_source,
    redirect: "manually click",
    source: "new_temp.js",
  });
}
