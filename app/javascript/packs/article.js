const handleHeartDisplay = (hasLiked) => {
    if (hasLiked) {
        $('.active-heart').removeClass('hidden')
    } else {
        $('.inactive-heart').removeClass('hidden')
    }
}

import $ from 'jquery'
import {
    listenInactiveHeartEvent,
    listenActiveHeartEvent
} from 'modules/handle_heart'
import axios from 'modules/axios'

const handleCommentForm = () => {
    $('.show-comment-form').on('click', () => {
        $('.show-comment-form').addClass('hidden')
        $('.comment-text-area').removeClass('hidden')
    })
}
const appendNewComment = (comment) => {
    $('.comments-container').append(
        `<div class = "article_comment"> <p>${ comment.content }</p></div>`
    )
}


document.addEventListener('DOMContentLoaded', () => {
    const dataset = $('#article-show').data()
    const articleId = dataset.articleId

    axios.get(`/articles/${articleId}/comments`)
        .then((response) => {
            const comments = response.data
            comments.forEach((comment) => {
                appendNewComment(comment)
            })
        })

    handleCommentForm()

    $('.add-comment-button').on('click', () => {
        const content = $('#comment_content').val()
        if (!content) {
            window.alert('コメントを入力してください')
        } else {
            axios.post(`/articles/${articleId}/comments`, {
                    comment: { content: content }
                })
                .then((res) => {
                    const comment = res.data
                    appendNewComment(comment)
                    $('#comment_content').val('')
                })
        }
    })

    axios.get(`/articles/${articleId}/like`)
        .then((response) => {
            console.log(response)
            const hasLiked = response.data.hasLiked
            handleHeartDisplay(hasLiked)
        })
    listenInactiveHeartEvent(articleId)
    listenActiveHeartEvent(articleId)

})