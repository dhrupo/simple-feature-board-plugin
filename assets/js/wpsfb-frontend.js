(function ($) {
  'use Strict';
  var id = $('#feature-id').attr('data-board-id');
  var reqTags = [];
  var reqPerPage = 5;
  var totalCount = 0;

  function renderRequest(pageno) {
    $.ajax({
      type: 'POST',
      url: ajax_url.ajaxurl,
      data: {
        action: 'wpsfb_get_features_request_count',
        id: id,
      },
      success: function (data) {
        totalCount = parseInt(data.data[0].count);
      },
      error: function (err) {
        console.log(err);
      }
    });

    $.ajax({
      type: 'POST',
      url: ajax_url.ajaxurl,
      data: {
        action: 'wpsfb_get_features_request_list',
        id: id,
        pageno: pageno
      },
      success: function (data) {
        var totalPages = Math.ceil(totalCount / reqPerPage);
        renderRequestHtml(data.data, totalPages);
      },
      error: function (err) {
        console.log(err);
      }
    });
  }
  renderRequest();

  function renderRequestHtml(data, totalPages) {
    var html = '';
    $.each(data, function (index, value) {
      var id = value.id;
      var title = value.title;
      var status = value.status;
      var user = value.username;

      $(".feature-request-content").html('');
      html += `<div data-request-id=${id} class='feature-request-list'>`;
      html += `<div class='title'>${title}</div>`;
      html += `<div class='bottom'>`;
      html += `<span class='status'>${status}</span>`;
      html += `<span class='user'>${user}</span>`;
      html += `</div>`;
      html += `</div>`;
      html += `</div>`;
    })
    html += `<div class="pagination">`;
    for (i = 1; i <= totalPages; i++) {
      html += `<a class="paginate" data-paginate-id=${i}>${i}</a>`;
    }
    $(".feature-request-content").append(html);
  }

  $('.add-feature').click(function () {
    $('.feature-board-content').css('display', 'none');
    $('.request-details').css('display', 'none');
    $('.feature-add-content').css('display', 'block');
  });

  $('#request-search').keyup(function (e) {
    // e.preventDefault();
    var search = e.target.value.trim().toUpperCase();
    if (e.keyCode == 13) {
      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_get_searched_feature',
          id: id,
          search: search
        },
        success: function (data) {
          e.target.value = "";
          renderRequestHtml(data.data);
        }
      });
    }
  })

  $('#add-feature-request').submit(function (e) {
    e.preventDefault();
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
        $('#feature-request-title').val('');
        $('#feature-request-details').val('');
        $('#feature-request-status').val('');
        renderRequest();
        $('.feature-add-content').css('display', 'none');
        $('.feature-board-content').css('display', 'block');
        $('.feature-request-content').css('display', 'block');
      }
    });
  })

  $('#feature-request-select').change(function (e) {
    var status = e.target.value;

    $.ajax({
      type: 'POST',
      url: ajax_url.ajaxurl,
      data: {
        action: 'wpsfb_get_feature_by_status',
        status: status
      },
      success: function (data) {
        renderRequestHtml(data.data);
      }
    });
  });

  $(document).on('click', '.paginate', function () {
    pageno = $(this).attr('data-paginate-id');
    renderRequest(pageno);
  });

  $(document).on('click', '.back-to-req', function () {
    $('.feature-add-content').css('display', 'none');
    $('.request-details').css('display', 'none');
    $('.feature-board-content').css('display', 'block');
    renderRequest();
  });

  $(document).on('keyup', '.req-tags', function (e) {
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
    var voteCount = 0;
    var isUserVoted = false;
    var comments = [];
    var isLoggedIn = false;
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
        },
        error: function (err) {
          console.log(err);
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
          voteCount = data.data && data.data[0].vote_count;
        },
        error: function (err) {
          console.log(err);
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
        },
        error: function (err) {
          console.log(err);
        }
      });
    }
    getComments();

    function checkIsLoggedIn() {
      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_is_logged_in',
        },
        success: function (data) {
          isLoggedIn = data.user;
        },
        error: function (err) {
          console.log(err);
        }
      });
    }
    checkIsLoggedIn();

    function getRequests() {
      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_get_single_feature_request',
          id: id
        },
        success: function (data) {
          setTimeout(function () {
            var title = data.data.title;
            var details = data.data.details;
            var status = data.data.status;
            var user = data.data.username;
            var tagsArray = data.data.tags ? data.data.tags.split(',') : 0;

            $('.feature-board-content').css('display', 'none');
            $(".request-details").html('');
            $('.request-details').css('display', 'block');
            var html = '';
            html += `<button class='back-to-req'>Back</button>`;
            html += `<div class='feature-vote-wrapper'>`;
            html += `<div class='single-feature'>`;
            html += `<h4 class='single-feature-title'>${title}</h4>`;
            html += `<p class='single-feature-details'>${details}</p>`;
            html += `<p class='single-feature-status'>${status}</p>`;

            if (tagsArray != 0) {
              html += `<p class='tags-wrapper'>`;
              $.each(tagsArray, function (index, value) {
                html += `<span>${value}</span>`;
              });
              html += `</p>`;
            }
            html += `<p>Requested by <b>${user}</b></p>`;
            html += `</div>`;
            html += `<div class='vote'>`;
            html += `<p class='vote-count'>Total votes: <b>${voteCount}</b></p>`;
            if (isLoggedIn) {
              if (isUserVoted) {
                html += `<button class="remove-vote">Unvote</button>`;
              }
              else {
                html += `<button class="add-vote">Vote</button>`;
              }
            }
            html += `</div>`;
            html += `</div>`;
            html += `<div class="request-comments-wrapper">`;
            html += `<h6>Comments</h6>`;
            html += `<div>`;
            if (isLoggedIn) {
              html += `<form>`;
              html += `<textarea placeholder='Add a comment...' rows='3' class="input-comment"></textarea>`;
              html += `<button class='add-comment' type='submit'>comment</button>`;
              html += `</form>`;
            }
            html += `</div>`;
            $.each(comments, function (index, value) {
              html += `<div class="request-comment">`;
              html += `<p>${value.comment}</p>`;
              html += `<p>${value.user_login}</p>`;
              html += `</div>`;
            });

            html += `</div>`;

            $(".request-details").append(html);
          }, 500)
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
          getComments();
          getRequests();
        },
        error: function (err) {
          console.log(err);
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
          getVotedUser();
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
          getVotedUser();
          getVotesCount();
          getRequests();
        }
      });
    });
  });

  $(document).on('click', '.login', function () {
    $('#login-form').css('display', 'block');
    $('.feature-board-content').css('display', 'none');
    $('.request-details').css('display', 'none');


    $('#login-form').submit(function (e) {
      e.preventDefault();
      var username = $('#username').val();
      var password = $('#password').val();

      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_sign_in',
          username: username,
          password: password
        },
        success: function (data) {
          location.reload();
        },
        error: function (xhr) {
          $('.login-error').text(JSON.parse(xhr.responseText).data);
        }
      })
    })

    $('.cancel').click(function () {
      $('#login-form').css('display', 'none');
      $('.feature-board-content').css('display', 'block');
    });
  });

  $(document).on('click', '.logout', function () {
    $.ajax({
      type: 'POST',
      url: ajax_url.ajaxurl,
      data: {
        action: 'wpsfb_sign_out',
      },
      success: function (data) {
        location.reload();
      }
    })
  });
})(jQuery)


