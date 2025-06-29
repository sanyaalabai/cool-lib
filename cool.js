const copyTextToClipboard = async (text) => {
        try {
          await navigator.clipboard.writeText(text);

          console.log("Text copied to clipboard successfully!");
        } catch (error) {
          console.error("Failed to copy text:", error);
          window.prompt(
            "To copy text press: Ctrl+C, Enter",
            text
          );
        }
      };