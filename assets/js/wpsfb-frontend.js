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

  $('.add-feature').click(function () {
    $('.feature-board-content').css('display', 'none');
    $('.feature-request-content').css('display', 'none');
    $('.feature-add-content').css('display', 'block');
    $('.feature-request-content').html('');
    $('.tags-error').css('display', 'none');
  });

  $(document).on('click', '.back-to-req', function () {
    $('.feature-add-content').css('display', 'none');
    $('.feature-board-content').css('display', 'block');
    $('.feature-request-content').css('display', 'block');
    $(".request-details").html('');
    $('.feature-request-content').html('');
    renderRequest();
  });

  $('#add-feature-request').submit(function (e) {
    e.preventDefault();
    // $('.feature-request-content').html('');
    var reqTitle = $('#feature-request-title').val().trim();
    var reqDetails = $('#feature-request-details').val().trim();
    var reqStatus = $('#feature-request-status').val().trim();

    if (reqTags.length == 0) {
      $('.tags-error').css('display', 'block');
      return;
    }

    var jsonReqTags = JSON.stringify(reqTags).replace(/[\[\]"]+/g, "");
    $.ajax({
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
      $('.show-tags').html('');
      $.each(reqTags, function (index, value) {
        html += `<span class='tag'>${value}</span>`;
      });
      if (reqTags.length > 0) {
        $('.tags-error').css('display', 'none');
      }
      $(".show-tags").append(html);
    }
  });

  $(document).on('click', '.tag', function (e) {
    index = reqTags.indexOf(e.target.innerText);
    reqTags.splice(index, 1);
    var html = '';
    $(".show-tags").html('');
    $.each(reqTags, function (index, value) {
      html += `<span class='tag'>${value}</span>`;
    });
    $(".show-tags").append(html);
  });

  $(document).on('click', '.feature-request-list', function () {
    var reqTags = [];
    var voteCount = 0;
    var isUserVoted = false;
    var comments = [];
    var singleRequests;
    var id = $(this).attr('data-request-id');

    function getVotedUser() {
      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_get_voted_user',
          id: id
        },
        success: function (data) {
          isUserVoted = data.data.length > 0;
        }
      });
    }
    getVotedUser();

    function getVotesCount() {
      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_get_feature_requests_votes_count',
          id: id
        },
        success: function (data) {
          voteCount = data.data[0].vote_count;
        }
      });
    }
    getVotesCount();

    function getComments() {
      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_get_feature_request_comments',
          id: id
        },
        success: function (data) {
          comments = data.data;
        }
      });
    }
    getComments();

    function getRequests() {
      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_get_single_feature_request',
          id: id
        },
        success: function (data) {
          $('.feature-board-content').css('display', 'none');
          $('.feature-request-content').css('display', 'none');
          $('.request-details').css('display', 'block');

          var id = data.data.id;
          var title = data.data.title;
          var details = data.data.details;
          var status = data.data.status;
          var user = data.data.username;
          tagsArray = data.data.tags.split(',');

          var html = '';
          html += `<button class='back-to-req'>Back</button>`;
          html += `<div class='feature-vote-wrapper'>`;
          html += `<div class='single-feature'>`;
          html += `<h4 class='single-feature-title'>${title}</h4>`;
          html += `<p class='single-feature-details'>${details}</p>`;
          html += `<p class='single-feature-status'>${status}</p>`;
          html += `<p class='tags-wrapper'>`;
          $.each(tagsArray, function (index, value) {
            html += `<span>${value}</span>`;
          });
          html += `</p>`;
          html += `<p>Requested by <b>${user}</b></p>`;
          html += `</div>`;
          html += `<div class='vote'>`;
          html += `<p class='vote-count'>Total votes: <b>${voteCount}</b></p>`;
          if (isUserVoted) {
            html += `<button class="remove-vote">Unvote</button>`;
          }
          else {
            html += `<button class="add-vote">Vote</button>`;
          }
          html += `</div>`;
          html += `</div>`;
          html += `<div class="request-comments-wrapper">`;
          html += `<h6>Comments</h6>`;
          $.each(comments, function (index, value) {
            html += `<div class="request-comment">`;
            html += `<p>${value.comment}</p>`;
            html += `<p>${value.user_login}</p>`;
            html += `</div>`;
          });
          html += `<div>`;
          html += `<form>`;
          html += `<textarea placeholder='Add a comment...' rows='3' class="input-comment"></textarea>`;
          html += `<button class='add-comment' type='submit'>comment</button>`;
          html += `</form>`;
          html += `</div>`;
          html += `</div>`;

          $(".request-details").append(html);
        }
      });
    }
    getRequests();

    $(document).on('click', '.add-comment', function (e) {
      e.preventDefault();
      var comment = $('.input-comment').val().trim();
      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_add_feature_request_comment',
          id: id,
          comment: comment
        },
        success: function () {
          $('.input-comment').val('');
          $(".request-details").html('');
          getComments();
          getRequests();
        }
      });
    });

    $(document).on('click', '.add-vote', function () {
      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_add_vote',
          id: id
        },
        success: function () {
          $(".request-details").html('');
          getVotedUser();
          getComments();
          getVotesCount();
          getRequests();
        }
      });
    });

    $(document).on('click', '.remove-vote', function () {
      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_remove_vote',
          id: id
        },
        success: function () {
          $(".request-details").html('');
          getVotedUser();
          getComments();
          getVotesCount();
          getRequests();
        }
      });
    });
  });
})(jQuery)


