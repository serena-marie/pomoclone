import { useRouteError } from 'react-router-dom';

/**
 *
 * @return {Component} Error Page
 */
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>D&apos;oh!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <p><a href="/">Go back to whence you came!</a></p>
    </div>
  );
}
