
const HOST = import.meta.env.VITE_APP_URL;

function uploadAdapter(loader) {
  return {
    upload: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const file = await loader.file;
          const formData = new FormData();
          formData.append('file', file);

          const response = await axios.request({
            method: "POST",
          //   url: `${HOST}/upload_files`,
            url: route('files.store'),
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
          console.log(response);
          // console.log(`${HOST}/storage/${response.data.path}`);
          resolve({
            default: `${HOST}/storage/${response.data.path}`
          });
        } catch (error) {
          reject(error);
        }
      });
    },
    abort: () => {}
  };
}

function uploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}

export {uploadPlugin}