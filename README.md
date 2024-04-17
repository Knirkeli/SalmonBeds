# Salmonbeds

Repo for my year two exam at Noroff

retrieve the API key manually and store it in a '.env' file that will only be accessible server-side
When a user logs in, set a secure cookie for the accessToken, and another for their name, email, and avatar URL in a "user" cookie. Use encodeURIComponent for the avatar url to ensure it's JSON-serializable.
This setup allows access to basic user info on every client request, simplifying server-side rendering.
For requests to authenticated endpoints, the request is routed through the Next.js backend and will include the .env API key along with the accessToken from the client
