$(document).ready(function () {
    $('#addBtn').click(function () {
        let taskTitle = $('#taskInput').val();
        $.ajax({
            url: '/add/',
            type: 'POST',
            contentType: 'application/json',
            headers: {
                'X-CSRFToken': csrfToken
            },
            data: JSON.stringify({
                title: taskTitle
            }),
            success: function (response) {
                $('#taskList').append(`
                    <li data-id="${response.id}">
                        <span>${response.title}</span>
                        <button class="completeBtn">Complete</button>
                        <button class="deleteBtn">Delete</button>
                    </li>
                `);
                $('#taskInput').val('');
            }
        });
    });

    $(document).on('click', '.deleteBtn', function () {
        let li = $(this).closest('li');
        let taskId = li.data('id');

        $.ajax({
            url: `/delete/${taskId}/`,
            type: 'GET',
            success: function () {
                li.remove();
            }
        });
    });

    $(document).on('click', '.completeBtn', function () {
        let li = $(this).closest('li');
        let taskId = li.data('id');

        $.ajax({
            url: `/complete/${taskId}/`,
            type: 'GET',
            success: function () {
                li.find('span').toggleClass('done');
            }
        });
    });

});