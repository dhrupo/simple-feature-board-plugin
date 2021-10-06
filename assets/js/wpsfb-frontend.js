var reqTags = [];
(function ($) {
  'use Strict';
  var id = $('#feature-id').attr('data-board-id');

  function renderRequest() {
    $.ajax({
      type: 'POST',
      url: ajax_url.ajaxurl,
      data: {
        action: 'wpsfb_get_features_request_list',
        id: id
      },
      success: function (data) {
        $.each(data.data, function (index, value) {
          var id = value.id;
          var title = value.title;
          var status = value.status;
          var user = value.username;

          var html = '';
          html += `<div data-request-id=${id} class='feature-request-list'>`;
          html += `<div class='title'>${title}</div>`;
          html += `<div class='bottom'>`;
          html += `<span class='status'>${status}</span>`;
          html += `<span class='user'>${user}</span>`;
          html += `</div>`;
          html += `</div>`;

          $(".feature-request-content").append(html);
        })
      },
      error: function (err) {
        console.log(err);
      }
    });
  }

  renderRequest();

  $('#request-search').keyup(function () {
  });

  $('.add-feature').click(function () {
    $('.feature-board-content').css('display', 'none');
    $('.feature-request-content').css('display', 'none');
    $('.feature-add-content').css('display', 'block');
    $('.feature-request-content').html('');
    $('.tags-error').css('display', 'none');
  });

  $('.back-to-req').click(function () {
    $('.feature-board-content').css('display', 'block');
    $('.feature-request-content').css('display', 'block');
    renderRequest();
    $('.feature-add-content').css('display', 'none');
  });

  $('#add-feature-request').submit(function (e) {
    e.preventDefault();
    $('.feature-request-content').html('');
    var reqTitle = $('#feature-request-title').val();
    var reqDetails = $('#feature-request-details').val();
    var reqStatus = $('#feature-request-status').val();

    if (reqTags.length == 0) {
      $('.tags-error').css('display', 'block');
      return;
    }
    var jsonReqTags = JSON.stringify(reqTags).replace(/[\[\]"]+/g, "");
    jQuery.ajax({
      type: 'POST',
      url: ajax_url.ajaxurl,
      data: {
        action: 'wpsfb_insert_feature_request',
        id: id,
        title: reqTitle,
        details: reqDetails,
        tags: jsonReqTags,
        status: reqStatus,
      },
      success: function (data) {
        renderRequest();
        $('.feature-board-content').css('display', 'block');
        $('.feature-request-content').css('display', 'block');
        $('.feature-add-content').css('display', 'none');
        $('#feature-request-title').val('');
        $('#feature-request-details').val('');
        $('#feature-request-status').val('');
      }
    });
  })

  $('.req-tags').keyup(function (e) {
    if (e.keyCode == 32) {
      var value = e.target.value.toUpperCase().trim();
      !reqTags.includes(value) && reqTags.push(value);
      e.target.value = '';
      var html = '';
      jQuery('.show-tags').html('');
      $.each(reqTags, function (index, value) {
        html += `<span class='tag'>${value}</span>`;
      });
      if (reqTags.length > 0) {
        $('.tags-error').css('display', 'none');
      }
      $(".show-tags").append(html);
    }
  });
})(jQuery)

jQuery(document).on('click', '.tag', function (e) {
  index = reqTags.indexOf(e.target.innerText);
  reqTags.splice(index, 1);
  var html = '';
  jQuery(".show-tags").html('');
  jQuery.each(reqTags, function (index, value) {
    html += `<span class='tag'>${value}</span>`;
  });
  jQuery(".show-tags").append(html);
});

jQuery(document).on('click', '.feature-request-list', function () {
  var id = jQuery(this).attr('data-request-id');
  jQuery.ajax({
    type: 'POST',
    url: ajax_url.ajaxurl,
    data: {
      action: 'wpsfb_get_single_feature_request',
      id: id
    },
    success: function (data) {
      console.log(data.data);
    }
  });
})