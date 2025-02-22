<p align="center">
    <h1 align="center"><b>Absolute Intelligence</b></h1>
<p align="center">
    Assignment
    <br />
    <br />
  </p>
</p>

# Update

The error with Azure OpenAI has been resolved by replacing it with **Google Generative AI**, which offers a better free trial. You can now view the output even on the deployed version.

## Notes

### **Resolved Issue**

The following issues were encountered earlier due to the limitations of the trial account for Azure OpenAI and Vercel. These have now been resolved:

> The deployed project is a working solution but due to the limitations of Trial account
> being used for the **AzureOpenAi** and **Vercel**
> you may face the following problems
> so i recommend to test it in localhost

1. **Azure OpenAI Rate Limit**:

   - The Azure OpenAI trial account had a limit of **1k tokens per minute**, often causing this error:
     ```
     Error code: 429 - {'error': {'code': '429', 'message': 'Rate limit is exceeded. Try again in X seconds.'}}
     ```
   - **Solution**: Replaced Azure OpenAI with **Google Generative AI** for chat responses while retaining Azure OpenAI for plugin calls.

2. Testing Prompts:
   1. **Nvidia stocks** stock plugin
   2. **Delhi Weather** Weather plugin
   3. **How to cook Noodles** search plugin
   4. **Hola in english** Translate Plugin
   5. **Good Morning** chat
3. **Deployed Version Limitations**:

   - The **Vercel Hobby Plan** imposed a 10-second execution limit. This caused issues with Azure OpenAI's slow response time.
   - **Resolved**: Google Generative AI has a better response time, allowing chat outputs to appear in the deployed version.

4. **Local Testing**:
   - The application works fully in localhost, provided the rate limit is not exceeded.

---

## Get started

To run the project locally,

1. Fork & Clone the repository

```bash
git clone https://github.com/reddam-charan-teja-reddy/omniplex-assignment
```

2. Install the dependencies

```bash
yarn
```

3. Fill out secrets in `.env.local`

```bash
BING_API_KEY=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_DEPLOYMENT_ID=
AZURE_MODEL_NAME=
OPENWEATHERMAP_API_KEY=
ALPHA_VANTAGE_API_KEY=
FINNHUB_API_KEY=
DEEP_TRANSLATE_API_KEY=
GOOGLE_API_KEY=
```

4. Configure Firebase in firebaseConfig.js:

```bash
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

```

5. Run the development server

```bash
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Tasks Completed:

1. **Login UI Enhancement:**

   Updated the login UI popup, emulating the style of Claude.ai, with improved responsiveness.

- **Before**

  [![Old ui](https://i.postimg.cc/3w65vxrP/Screenshot-2024-12-01-101821.png)](https://postimg.cc/t1hM0yx5)

- **After**

  [![New Ui](https://i.postimg.cc/B6V6t0R6/Screenshot-2024-12-01-102605.png)](https://postimg.cc/gX3dBfzF)

2. **API Integration:**

   Added Translation plugin to the app
   from [DeepTranslateApi](https://rapidapi.com/gatzuma/api/deep-translate1).

   - example

     [![Translate plugin](https://i.postimg.cc/4nk7WGfd/Screenshot-2024-12-01-104655.png)](https://postimg.cc/kRsg5kt3)

3. **Deployment:**

   - Deployed the project on **Vercel** you can check it [here](https://omniplex-assignment.vercel.app/)

   - Azure deployment was not possible due to quota restrictions in the Trial account.

4. **Use of AI Tools:**

   - Used GitHub Copilot to understand the workflow of the web app and enhance development efficiency.
   - This allowed faster debugging and seamless navigation through the codebase.

## Approach and challenges

1. **Time Management:**

   - Balancing this assignment alongside mid-term examinations required structured planning. Tasks were outlined and divided over the week for optimal efficiency.

1. **Initial Setup:**

   - Spent the first and second day understanding the codebase, fixing setup errors, and configuring environment variables.

   - Challenge: Many API keys required paid accounts.
     - Solution: Used [RapidAPI](https://rapidapi.com/) alternatives and adapted the code accordingly

1. **AzureOpenAI Integration:**

   - Migrating from **OpenAI** API to **AzureOpenAI** was challenging due to limited resources and documentation.

     - **Solution**: Extensively referred to Azure documentation and community forums to implement and debug the integration.

   - (**update**) Switched to **GoogleGenerativeAi** for better performance

1. **Login UI Enhancement:**

   - Enhanced the UI of login page (popup). Made it responsive, Followed the Design style of ClaudeAi, show casedthe features using a carousel from **shadcn/ui** etc.

1. **Translate Plugin:**

   - Completed adding the **Translate Plugin**. Leveraged the understanding of the codebase from earlier steps to quickly integrate and debug the plugin.

1. **Deployment:**
   - Attempted Azure deployment but faced quota issues for trial accounts
     - **Solution**: Switched to Vercel for hosting.
     - **Remaining issues:(resolved)**
       Remaining Issue: EDGE_FUNCTION_INVOCATION_TIMEOUT (504 error) due to plan limitations. Resolving this would require upgrading to Vercel Pro and Azure services.
     - **Solution**
       Update the Chat API to use **GoogleGenerativeAi** which has better response rate than **AzureOpenAi**
1. **Final Submission:**
   - Consolidated all tasks and documentation on the last day for submission.
