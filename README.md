# YouTube clone 

This is a simple YouTube clone project built with React. With this application, you can search for videos, view popular real-time videos, watch videos, view comments, and browse related video lists.  

___Please note that the functionalities for signing in, subscribing, liking and disliking videos, and adding comments have not been implemented in this project___

## Table of Contents

1. [Screen Shots/Demo](#screenshot)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Technology Stack](#tech-stack)
5. [Reflection](#reflection)

## Screenshots <a name="screenshot"></a>

### Main Page
![popular](https://github.com/Potatojelly/YoutubeClone/assets/108857524/9c0d9478-6ddf-4b47-9b53-2f9a71ffeeb9)

### Search Page
![search](https://github.com/Potatojelly/YoutubeClone/assets/108857524/ea23ad4e-abe3-4ccf-9105-68bbd1697096)

### Video Page
![watch](https://github.com/Potatojelly/YoutubeClone/assets/108857524/15bf83ad-81df-4fed-9682-32daffb0d0c8)

### Comments Section
![comments](https://github.com/Potatojelly/YoutubeClone/assets/108857524/f5c8e9ce-f92e-43de-8e74-fbe3f3789997)


Demo:https://sunny-cranachan-aeae8a.netlify.app

___Please note that YouTube API Token is limited to 10,000 per day. If you keep receiving 403 errors, YouTube API Token has been used up___

## Installation <a name="installation"></a>

To get the application running locally on your machine, you would need to have Node.js and npm installed. Here are the steps to follow:

1. Clone the repository:
2. Navigate to the directory of the cloned repository.
3. Install the dependencies by running yarn install.
4. Once all dependencies are installed, start the local server by running yarn start.
5. Open a web browser and navigate to http://localhost:3000 to use the Youtube clone website.

## Usage <a name="usage"></a>

* Real-time popular videos: See the popular real-time videos on YouTube.
* Video search: Search for videos using keywords.
* Watch videos: Click on a video to watch it.
* View comments: Read comments on a video.
* Browse related videos: See related videos based on the clicked video.
* Dark and Light Mode: Click the Moon or Sun logo to change the website's theme.
* Responsive website: The website layout adjusts dynamically based on the size of the browser, providing an optimal viewing experience on different devices and screen sizes.
* Infinite scroll: The popular videos, related videos, searched videos, and comments sections support infinite scroll functionality. 
  As you scroll down, more content is automatically loaded, allowing you to explore other videos and comments without manual page navigation seamlessly.

## Technology stack <a name="tech-stack"></a>
The YouTube clone project is built using the following technologies:

* Frontend: React, JS, PostCSS
* Debugging Tools: React Developer Tools extension 
* Additional Libraries: React Query, React Router, Timeago, Numeral
* YouTube Data API
* Intersection Observer API

## Reflection <a name="reflection"></a>

### Context for the Project

This project aims to understand better React state management, React Router, and React Query and deepen my knowledge of API integration, data fetching, and data manipulation within a React application. By replicating core features of YouTube, such as video search, infinite scroll, and comments, I aimed to improve my knowledge and skills in front-end development.

### Objective

Client Side Routing: Implement client-side routing using React Router enabling users to easily switch between different views and components without the need for full page reloads.
React Query: Utilize the React Query library to streamline data fetching and state management, handling caching to enhance the overall performance.
Infinity Scroll: Create a seamless browsing experience using Intersection Observer API and React Query. 
API Integration: Integrate the YouTube Data API to fetch data from YouTube, such as video details, comments, and related videos.

### Challenges and Learning Experiences

Throughout the development of this YouTube clone project, I encountered several challenges that provided valuable learning experiences. 

1. Learning New Skills: I invested considerable time reading and understanding the documentation for React Router, React Query, React, and the YouTube API. While initially challenging, it helped me grasp the necessary concepts and better understand these technologies.

2. Implementing Infinite Scroll: One major challenge was implementing the infinite scroll functionality. Initially, I implemented the function by placing the observer section at the bottom. However, I encountered an issue where newly fetched data kept stacking on the observer instead of appearing below the existing data when the parent tags had limited height. To solve this, I modified the approach by assigning the observer to the last item in the newly fetched data. This ensured that new data appeared correctly below the existing content.

3. Handling Infinite Scroll in the Comments Section: Another challenge arose when implementing infinite scroll for the comments section. It caused issues detecting an item the observer attaches to when fetching new data, even when it does not intersect the viewport. The cause of the problem was the comment container did not have height; its height was set to content-fit. I'm still trying to figure out why not giving a fixed height is causing the problem. For now, to resolve this, I gave the observer to the second item from the bottom and adjusted the root margin and threshold settings in the Intersection Observer. This adjustment allowed for infinite scroll to act correctly and dynamic context height in the comment container.

4. Debugging and Bug Fixing: I spent a significant amount of time debugging and fixing bugs related to the infinite scroll functionality. This process involved reviewing useEffect, useCallback, and useMemo, hooks, carefully analyzing error messages, examining the code, and leveraging debugging tools. Through this experience, I could get a deeper understanding of useEffect, useCallback react hooks, improved my problem-solving skills, and gained confidence in troubleshooting issues.
