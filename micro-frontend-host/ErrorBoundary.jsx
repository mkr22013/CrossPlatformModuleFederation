import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <div
        style={{
          display: "flex",
          float: "left",
          width: "50%",
        }}
      >
        <button onClick={resetErrorBoundary} style={{ marginRight: "10px" }}>
          Try again
        </button>
        <button onClick={(event) => (window.location.href = "/")}>Home</button>
      </div>
    </div>
  );
}

export default function MyErrorBoundary({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
}
