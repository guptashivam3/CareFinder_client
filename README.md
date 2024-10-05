# CareFinder Client

## Project Overview
The **CareFinder Client** is a web-based application that allows users to search for hospitals by ID, state, city, or hospital name. The client sends requests to an API and displays the relevant hospital data in a user-friendly format. It is built using **HTML5**, **CSS3**, **JavaScript**, and **Bootstrap** for a responsive front-end.

### Key Features:
- Search for hospitals by ID, state, city, or name.
- Fetch hospital data from an external API using `fetch()`.
- Display the data in a clean, structured layout.
- View the raw XML response from the API.
- Responsive design with dynamic background color changes on scroll.

---

## Technologies Used

- **HTML5**: For structuring the layout of the web application.
- **CSS3**: For styling and creating a responsive, user-friendly interface.
- **JavaScript**: For handling API requests, parsing XML data, and dynamically updating the DOM.
- **Bootstrap**: For responsive and clean UI components.
- **DOMParser**: Used to parse XML responses from the API.
- **Git**: Version control to manage and track changes in the project.
- **GitHub**: Remote repository to host the project.

---

## Project Structure

### 1. Parsing XML
The API returns data in XML format. We use **DOMParser** to convert the XML string into an accessible structure for JavaScript.

- **Why DOMParser?**  
  DOMParser allows us to work with XML as a tree structure in the same way we interact with HTML DOM, making it easy to extract information from XML nodes.

### 2. Extracting Data
The function extracts specific tags from the XML response, such as:
- `hospital_name`
- `address`
- `city`
- `state`
- `zip_code`
- `hospital_type`

We also implement fallback values (e.g., "Unknown") for any missing tags to ensure that the user sees consistent information, even if some fields are missing from the API response.

### 3. Displaying Data
After extracting the hospital information, the data is inserted into the DOM. The results are displayed within a `<div>` element with the id `output`. The raw XML data is also displayed in a `<pre>` tag so users can inspect the structure if needed.

```html
<div id="output"></div>
<pre id="xmlDisplay"></pre>
