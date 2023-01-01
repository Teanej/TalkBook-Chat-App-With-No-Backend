document.getElementById("username").innerHTML =
  localStorage.getItem("username");
(function () {
  let pubnub = new PubNub({
    publishKey: "demo",
    subscribeKey: "demo",
  });
  function $(id) {
    return document.getElementById(id);
  }

  let messages = $("box"),
    input = $("input"),
    channel = "talksbook_public_chat_channel";
  pubnub.addListener({
    message: function (obj) {
      messages.innerHTML =
        ("" + obj.message).replace() + "<br><br>" + messages.innerHTML;
    },
  });
  pubnub.subscribe({
    channels: [channel],
  });
  let nickname = document.getElementById("username");
  let tag = document.getElementById("tag");
  input.addEventListener("keyup", function (e) {
    if ((e.keyCode || e.charCode) === 13) {
      pubnub.publish({
        channel: channel,
        message:
          nickname.textContent + ": " + "@" + tag.value + "  " + input.value,
        x: (input.value = ""),
      });
    }
  });
  pubnub.fetchMessages(
    {
      channels: [channel],
      end: "15343325004275466",
      count: 25, // default/max is 25 messages for multiple channels (up to 500)
    },
    function (status, response) {
      console.log(response);
      for (
        let i = 0;
        i < response.channels.talksbook_public_chat_channel.length;
        i++
      ) {
        messages.append(
          response.channels.talksbook_public_chat_channel[i].message,
          document.createElement("br"),
          document.createElement("br")
        );
      }
    }
  );
})();

document.getElementById("submit2").onclick = function () {
  (function () {
    var pubnub = new PubNub({
      publishKey: "demo",
      subscribeKey: "demo",
    });
    function $(id) {
      return document.getElementById(id);
    }
    var box = $("messages");
    let input = $("input-container");
    let channel1 = document.getElementById("lobby-input").value;

    pubnub.addListener({
      message: function (obj) {
        box.innerHTML = ("" + obj.message).replace() + "<br>" + box.innerHTML;
      },
    });
    pubnub.subscribe({
      channels: [channel1],
    });

    input.addEventListener("keyup", function (e) {
      if ((e.keyCode || e.charCode) === 13) {
        pubnub.publish({
          channel: channel1,
          message:
            document.getElementById("username").textContent +
            ": " +
            "@" +
            document.getElementById("tagger").value +
            " " +
            input.value,
          x: (input.value = ""),
        });
      }
    });
  })();

  document.getElementById("join-container").style.display = "none";
  document.getElementById("chat2").style.display = "block";
};
