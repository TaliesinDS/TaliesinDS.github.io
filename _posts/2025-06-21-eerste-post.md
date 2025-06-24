---
title: "Eerste post"
layout: single
author_profile: true
tags: post
excerpt_separator: <!--more-->
header:
 overlay_image: /assets/images/banner02.png
 overlay_filter: 0.2
comments: true
---
eerste post test. <!--more-->

![test image of a bull]({{page.image}})

<form action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSd-xZgVsbuQsLumpP_W1u97vPG7RbR9_awZ3XDQTpXegkB1XA/formResponse" method="POST">
  <label for="name">Name:</label><br>
  <input type="text" id="name" name="entry.1922964266" required><br><br>
  
  <label for="email">Email:</label><br>
  <input type="email" id="email" name="entry.1297944239" required><br><br>

 <label for="comment">Comment:</label><br>
  <input type="text" id="comment" name="entry.503498009" required><br><br>
   
  <button type="submit">Submit</button>
</form>

<div id="comments"></div>
<script>
    // Function to format the date and time from the data
    function formatDate(stringDate) {
        // Split the string into date and time parts
        const dateTimeParts = stringDate.split(' ');
        const datePart = dateTimeParts[0]; // Date part like "7/12/2024"
        let timePart = dateTimeParts[1]; // Time part like "23:32:54"
        // Parse hours, minutes, and seconds from the time part
        const [hours, minutes, seconds] = timePart.split(':');
        // Convert hours to 12-hour format and determine AM/PM
        let ampm = 'AM';
        let formattedHours = parseInt(hours, 10);
        if (formattedHours >= 12) {
            ampm = 'PM';
            if (formattedHours > 12) {
                formattedHours -= 12;
            }
        }
        if (formattedHours === 0) {
            formattedHours = 12; // 12 AM case
        }
        // Format time in HH:mm:ss AM/PM format
        timePart = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
        // Return the formatted date and time
        return `${datePart} at ${timePart}`;
    }
    // Get the current page URL
    const thisPageUrl = window.location.href;
    // Encode the SQL statement to be used in the URL
    const sqlStatement = encodeURIComponent(`SELECT A, C, D, E, F WHERE B = '${thisPageUrl}'`);
    // Construct the URL for fetching the data
    const csvUrl = `https://docs.google.com/spreadsheets/d/1ZqE6ePnexceUrxq90JD6buZ1Zl3agU11_i_TDaCTCuU/gviz/tq?tqx=out:csv&sheet=comments&tq=${sqlStatement}&headers=0`;
    // Fetch the data from the Google Sheets URL
    fetch(csvUrl)
        .then(response => response.text()) // Get the response text (data)
        .then(csvText => {
            // Split the data into rows and then into individual cells
            const rows = csvText.trim().split('\n').map(row => row.split(','));
            // Get the container element for the comments
            const commentsContainer = document.getElementById('comments');
            // Loop through each row of the data
            rows.forEach(row => {
                const date = formatDate(row[0]); // Format the date and time
                const name = row[1]; // Get the name
                const comment = row[2]; // Get the comment
                const email = row[4]; // Get the email
                // Create a new div element for the comment
                const commentDiv = document.createElement('div');
                // Set the inner HTML of the div element
                commentDiv.innerHTML = `<strong><a href="mailto:${email}">${name}</a></strong> <em>${date}</em>: <p>${comment}</p>`;
                // Append the div element to the comments container
                commentsContainer.appendChild(commentDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error)); // Handle any errors
</script>