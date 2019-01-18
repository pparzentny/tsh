export class Template {

    loader(event) {
        return (typeof this[event.type] == 'function') ? this[event.type](event) : false
    }

    date_format(date) {
        let dateObj = new Date(date)

        let options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }

        return dateObj.toLocaleString('en-us', options)
    }

    PullRequestEvent(event) {
        const template = `
            <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <p class="heading">${ this.date_format(event.created_at) }</p>
                    <div class="content">
                        <span class="gh-username">
                            <img src="${event.payload.pull_request.user.avatar_url}"/>
                            <a href="${event.payload.pull_request.user.html_url}">${event.payload.pull_request.user.login}</a>
                        </span>
                        ${event.payload.action}
                        <a href="${event.payload.pull_request.html_url}">pull request</a>
                        <p class="repo-name">
                            <a href="${event.repo.url}">${event.repo.name}</a>
                        </p>
                    </div>
                </div>
            </div>
        `

        return template
    }

    PullRequestReviewCommentEvent(event) {
        const template = `
            <div class="timeline-item is-primary">
                <div class="timeline-marker is-primary"></div>
                <div class="timeline-content">
                    <p class="heading">${ this.date_format(event.created_at) }</p>
                    <div class="content">
                        <span class="gh-username">
                            <img src="${event.payload.pull_request.user.avatar_url}"/>
                            <a href="${event.payload.pull_request.user.html_url}">${event.payload.pull_request.user.login}</a>
                        </span>
                        ${event.payload.action}

                        <a href="${event.payload.comment.html_url}">comment</a>
                        to

                        <a href="${event.payload.pull_request.html_url}">pull request</a>
                        <p class="repo-name">
                            <a href="${event.repo.url}">${event.repo.name}</a>
                        </p>
                    </div>
                </div>
            </div>
        `

        return template
    }

}