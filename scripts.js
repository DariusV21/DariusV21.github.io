document.addEventListener("DOMContentLoaded", function() {
    openPage('home'); // Display the home page by default
});

function openPage(pageId) {
    // Hide all pages
    var pages = document.getElementsByClassName('page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }

    // Show the selected page
    var selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const tags = document.querySelectorAll('.tag');
    const resultsContainer = document.querySelector('.search-results');
    const thumbnailsContainer = document.querySelector('.project-thumbnails');

    let projects = [];

    // Load projects.json
    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            projects = data;
        });

    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            const selectedTag = tag.textContent;
            const filtered = projects.filter(project =>
                project.tags.includes(selectedTag)
            );
            displayResults(filtered);
        });
    });

    function displayResults(filteredProjects) {
        // Hide default thumbnails
        thumbnailsContainer.style.display = 'none';
        // Show filtered results
        resultsContainer.innerHTML = '';
        if (filteredProjects.length === 0) {
            resultsContainer.innerHTML = '<p>No projects found.</p>';
            return;
        }
        filteredProjects.forEach(project => {
            const div = document.createElement('div');
            div.className = 'project-thumb';
            div.innerHTML = `
                <a href="${project.link}">
                    <img src="${project.thumbnail}" alt="${project.title}">
                    <div class="project-title">${project.title}</div>
                </a>
            `;
            resultsContainer.appendChild(div);
        });
    }
});
