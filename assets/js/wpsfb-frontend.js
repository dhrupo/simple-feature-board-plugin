(function ($) {
  'use Strict';
  var boardId = $('#feature-id').attr('data-board-id');
  var reqPerPage = 5;
  var totalCount = 0;
  var user_id;

  $.ajax({
    type: 'POST',
    url: ajax_url.ajaxurl,
    data: {
      action: 'wpsfb_frontend_is_logged_in'
    },
    success: function (data) {
      user_id = data.user_id;
    },
    error: function (err) {
      $('.error').text(err.responseJSON.data);
    }
  });

  function renderRequest(pageno) {
    var pageNumber = pageno ? pageno : 1;
    $.ajax({
      type: 'POST',
      url: ajax_url.ajaxurl,
      data: {
        action: 'wpsfb_frontend_get_features_request_count',
        id: boardId,
        wpsfb_frontend_nonce: ajax_url.wpsfb_frontend_nonce,
      },
      success: function (data) {
        totalCount = parseInt(data.data.count);
      },
      error: function (err) {
        $('.error').text(err.responseJSON.data);
      }
    });

    $.ajax({
      type: 'POST',
      url: ajax_url.ajaxurl,
      data: {
        action: 'wpsfb_frontend_get_features_request_list',
        id: boardId,
        pageno: pageNumber,
        wpsfb_frontend_nonce: ajax_url.wpsfb_frontend_nonce,
      },
      success: function (data) {
        var totalPages = Math.ceil(totalCount / reqPerPage);
        renderRequestHtml(data.data, totalPages);
      },
      error: function (err) {
        $('.error').text(err.responseJSON.data);
      }
    });
  }
  renderRequest();

  function renderRequestHtml(data, totalPages) {
    var html = '';
    $(".error").css('display', 'none');
    $(".feature-request-content").html('');

    $.each(data, function (index, value) {
      var reqId = value.id;
      var title = value.title;
      var status = value.status;
      var user = value.username;
      var commentCount = value.comment_count;
      var voteCount = value.vote_count;

      html += `<div data-request-id=${reqId} class='feature-request-list'>`;
      html += `<div class="left-section">`;
      html += `<div class='title'>${title}</div>`;
      html += `<div class='bottom'>`;
      html += `<div class='status'>${status}</div>`;
      html += `<div class='user'>by ${user}</div>`;
      html += `</div>`;
      html += `</div>`;
      html += `<div class="right-section">`;
      html += `<div><span class="dashicons dashicons-admin-comments"></span><span class="dashicon-text">${commentCount}</span></div>`;
      html += `<div><span class="dashicons dashicons-tickets-alt"></span><span class="dashicon-text">${voteCount}</span></div>`;
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

  $('.paginate').click(function () {
    pageno = $(this).attr('data-paginate-id');
    renderRequest(pageno);
  });

  $('#request-search').keyup(function (e) {
    var search = e.target.value.trim().toUpperCase();
    if (e.keyCode == 13) {
      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_frontend_get_searched_feature',
          id: boardId,
          search: search,
          wpsfb_frontend_nonce: ajax_url.wpsfb_frontend_nonce,
        },
        success: function (data) {
          e.target.value = "";
          renderRequestHtml(data.data);
        },
        error: function (err) {
          $('.error').text(err.responseJSON.data);
        }
      });
    }
  })

  $('#feature-request-select').change(function (e) {
    var status = e.target.value;

    $.ajax({
      type: 'POST',
      url: ajax_url.ajaxurl,
      data: {
        action: 'wpsfb_frontend_get_feature_by_status',
        status: status,
        id: boardId,
        wpsfb_frontend_nonce: ajax_url.wpsfb_frontend_nonce,
      },
      success: function (data) {
        renderRequestHtml(data.data);
      },
      error: function (err) {
        $('.error').text(err.responseJSON.data);
      }
    });
  });

  $('#add-feature-request').click(function (e) {
    e.preventDefault();
    var reqTitle = $('#feature-request-title').val().trim();
    var reqDetails = $('#feature-request-details').val().trim();

    $.ajax({
      type: 'POST',
      url: ajax_url.ajaxurl,
      data: {
        action: 'wpsfb_frontend_insert_feature_request',
        id: boardId,
        title: reqTitle,
        details: reqDetails,
        wpsfb_frontend_nonce: ajax_url.wpsfb_frontend_nonce,
      },
      success: function (data) {
        $('#feature-request-title').val('');
        $('#feature-request-details').val('');
        $('.feature-add-content').css('display', 'none');
        renderRequest();
        $('.feature-board-content').css('display', 'block');
      },
      error: function (err) {
        $('.error').text(err.responseJSON.data);
        $(".error").css('display', 'block');
      }
    });
  })

  $('.back-to-req').click(function (e) {
    $('.feature-add-content').css('display', 'none');
    $('.request-details').css('display', 'none');
    renderRequest();
    $('.feature-board-content').css('display', 'block');
  });

  $(document).on('click', '.feature-request-list', function () {
    var isUserVoted = false;
    var comments = [];
    var id = $(this).attr('data-request-id');

    $('.feature-board-content').css('display', 'none');
    $('.request-details').css('display', 'block');

    function getVotedUser() {
      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_frontend_get_voted_user',
          id: id,
          wpsfb_frontend_nonce: ajax_url.wpsfb_frontend_nonce,
        },
        success: function (data) {
          isUserVoted = data.data ? true : false;
        },
        error: function (err) {
          $('.error').text(err.responseJSON.data);
        }
      });
    }
    getVotedUser();

    function getComments(id) {
      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_frontend_get_feature_request_comments',
          id: id,
          wpsfb_frontend_nonce: ajax_url.wpsfb_frontend_nonce,
        },
        success: function (data) {
          comments = data.data;
          $('.request-comment').html('');
          $('.add-comment').css('display', 'block');
          $('.btn-edit-comment').css('display', 'none');

          $.each(comments, function (index, value) {
            var html = "";
            html += `<div class='comment-details'>`;
            html += `<p class='user-comment'>${value.comment}</p>`;
            html += `<p class='user-name'> ${value.user_login}</p>`;
            if (value.user_id == user_id) {
              html += `<div><a comment-id=${value.id} class="edit-comment">Edit</a> | <a comment-id=${value.id} class="remove-comment">Delete</a></div>`;
            }
            html += `</div>`;

            $('.request-details > .request-comments-wrapper > .request-comment').append(html);
          });
        },
        error: function (err) {
          $('.error').text(err.responseJSON.data);
        }
      });
    }
    getComments(id);

    $(document).on('click', '.edit-comment', function (e) {
      e.stopImmediatePropagation();
      var commentId = $(this).attr('comment-id');
      var id = $('.feature-request-list').attr('data-request-id');

      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_frontend_get_single_feature_request_comment',
          comment_id: commentId,
          wpsfb_frontend_nonce: ajax_url.wpsfb_frontend_nonce,
        },
        success: function (data) {
          $('.input-comment').val(data.data.comment);
          $('.btn-edit-comment').css('display', 'block');
          $('.add-comment').css('display', 'none');
        },
        error: function (err) {
          $('.error').text(err.responseJSON.data);
        }
      });
    })

    $('.btn-edit-comment').click(function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var comment = $('.input-comment').val().trim();
      var commentId = $('.edit-comment').attr('comment-id');
      var id = $('.request-details').attr('req-id');
      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_frontend_edit_feature_request_comment',
          req_id: id,
          comment_id: commentId,
          comment: comment,
          wpsfb_frontend_nonce: ajax_url.wpsfb_frontend_nonce,
        },
        success: function () {
          $('.input-comment').val('');
          getComments(id);
        },
        error: function (err) {
          $('.error').text(err.responseJSON.data);
        }
      });
    })

    $(document).on('click', '.remove-comment', function (e) {
      e.stopImmediatePropagation();
      var commentId = $(this).attr('comment-id');
      var id = $('.request-details').attr('req-id');
      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_frontend_remove_feature_request_comment',
          comment_id: commentId,
          wpsfb_frontend_nonce: ajax_url.wpsfb_frontend_nonce,
        },
        success: function (data) {
          getComments(id);
        },
        error: function (err) {
          $('.error').text(err.responseJSON.data);
        }
      });
    })

    function getRequests() {
      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_frontend_get_single_feature_request',
          id: id,
          wpsfb_frontend_nonce: ajax_url.wpsfb_frontend_nonce,
        },
        success: function (data) {
          var id = data.data.id;
          var title = data.data.title;
          var details = data.data.details;
          var status = data.data.status;
          var user = data.data.username;
          var tagsArray = data.data.tags ? data.data.tags.split(',') : 0;
          var voteCount = data.data.vote_count;

          $('.request-details').attr('req-id', id);

          $('.request-details > .feature-vote-wrapper > .single-feature > .single-feature-title').text(title);
          $('.request-details > .feature-vote-wrapper > .single-feature > .single-feature-details').text(details);
          $('.request-details > .feature-vote-wrapper > .single-feature > .single-feature-title').text(details);
          $('.request-details > .feature-vote-wrapper > .single-feature > .single-feature-status').text(status);

          if (tagsArray.length != 0) {
            var tagsHtml = "";
            $.each(tagsArray, function (index, value) {
              tagsHtml = `<span>${value}</span>`;
            });
            $('.request-details > .feature-vote-wrapper > .single-feature > .tags-wrapper').html('');
            $('.request-details > .feature-vote-wrapper > .single-feature > .tags-wrapper').append(tagsHtml);
          }
          $('.request-details > .feature-vote-wrapper > .single-feature > .user > b').text(user);

          $('.request-details > .feature-vote-wrapper > .vote > .vote-count > b').text(voteCount);

          var voteButtonHtml = "";
          if (isUserVoted) {
            voteButtonHtml += `<button class="btn remove-vote">Unvote</button>`;
          }
          else {
            voteButtonHtml += `<button class="btn add-vote">Vote</button>`;
          }
          $('.request-details > .feature-vote-wrapper > .vote > .btn-check-vote').html('');
          $('.request-details > .feature-vote-wrapper > .vote > .btn-check-vote').append(voteButtonHtml);
        },
        error: function (err) {
          $('.error').text(err.responseJSON.data);
        }
      });
    }
    getRequests();

    $('.add-comment').off('click').on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var comment = $('.input-comment').val().trim();
      var id = $('.request-details').attr('req-id');
      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_frontend_add_feature_request_comment',
          id: id,
          comment: comment,
          wpsfb_frontend_nonce: ajax_url.wpsfb_frontend_nonce,
        },
        success: function () {
          $('.input-comment').val('');
          getComments(id);
        },
        error: function (err) {
          $('.error').text(err.responseJSON.data);
        }
      });
    });

    $(document).on('click', '.add-vote', function (e) {
      e.stopImmediatePropagation();
      var id = $('.request-details').attr('req-id');

      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_frontend_add_vote',
          id: id,
          wpsfb_frontend_nonce: ajax_url.wpsfb_frontend_nonce,
        },
        success: function (data) {
          isUserVoted = data.data ? true : false;
          getRequests(id);
        }
      });
    });

    $(document).on('click', '.remove-vote', function (e) {
      e.stopImmediatePropagation();
      var id = $('.request-details').attr('req-id');

      $.ajax({
        type: 'POST',
        url: ajax_url.ajaxurl,
        data: {
          action: 'wpsfb_frontend_remove_vote',
          id: id,
          wpsfb_frontend_nonce: ajax_url.wpsfb_frontend_nonce,
        },
        success: function (data) {
          isUserVoted = data.data ? true : false;
          getRequests();
        }
      });
    });
  });
})(jQuery)


