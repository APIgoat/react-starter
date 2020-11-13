/**
 * Handles simple request responses
 * @param response
 */
export const handleApiMessages = (response: any) => {
  var messages = "";
  var errors = "";

  if (response?.data) {
    // combined all messages
    if (response?.data?.messages) {
      if (Array.isArray(response?.data?.messages)) {
        messages = response.data.messages.map(
          (message: string) => message + "\n"
        );
      } else {
        messages = response.data.messages;
      }
    }

    if (response?.data?.errors) {
      // in case of errors, log to console
      // handle uncaught errors
      errors = response.data.errors.map((message: string) => message + "\n");

      console.log(errors);
    }
  } else {
    messages = "This server is going crazy. Please try again later.";
  }

  return messages;
};

export default handleApiMessages;
