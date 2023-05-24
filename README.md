# React CRUD Comment App

This is a simple CRUD (Create, Read, Update, Delete) Comment application built using React. The application allows users to manage comments by adding, editing, updating, and deleting them. It utilizes React's functional components and hooks to achieve a dynamic and interactive user interface.

## Features

- Add a new comment
- Edit an existing comment
- Update a comment
- Delete a comment
- Passing data between parent and child components using props

## Technologies Used

- React
- JavaScript
- HTML
- CSS

## Installation

To run this application locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd react-crud-comment-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   The application will now be running on [http://localhost:3000](http://localhost:3000).

## Usage

Once the application is running, you will see the main comment page. The page displays a list of existing comments, along with options to add, edit, update, and delete comments.

### Adding a Comment

To add a new comment:

1. Click on the "Add Comment" button.
2. Enter the comment text in the input field.
3. Click on the "Submit" button.

The new comment will be added to the list of existing comments.

### Editing a Comment

To edit an existing comment:

1. Click on the "Edit" button next to the comment you want to edit.
2. The comment text will appear in an editable input field.
3. Make the desired changes to the comment text.
4. Click on the "Save" button to save the changes.
5. The updated comment will be reflected in the list of comments.

### Updating a Comment

To update a comment:

1. Click on the "Update" button next to the comment you want to update.
2. The comment text will appear in an editable input field.
3. Make the desired changes to the comment text.
4. Click on the "Save" button to save the changes.
5. The updated comment will be reflected in the list of comments.

### Deleting a Comment

To delete a comment:

1. Click on the "Delete" button next to the comment you want to delete.
2. Confirm the deletion in the prompt that appears.
3. The comment will be removed from the list of comments.

## Component Structure

The application is structured into the following components:

- **App**: The root component that holds the state and renders the CommentList and CommentForm components.
- **CommentList**: Renders the list of comments and passes the data to the CommentItem component.
- **CommentItem**: Renders an individual comment and provides options to edit, update, and delete the comment.
- **CommentForm**: Provides a form to add new comments and handles the submission.

## Data Flow

Data is passed between the components using props. The parent component, App, manages the state of the comments and passes them down to the CommentList component as props. CommentList then maps over the comments and passes each comment data to the CommentItem component as props. In turn, CommentItem component can trigger actions such as editing, updating, and deleting comments, which are handled by the parent component via callback functions passed as props.

## Contributions

Contributions to this project are welcome. Feel free to fork the repository, make improvements, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
