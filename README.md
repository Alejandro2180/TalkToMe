# TalkToMe

TalkToMe is a lightweight integration between Twilio and ChatGPT that enables users to initiate a call to themselves and engage in simulated conversations with popular personas. This project highlights how existing technologies can be used with minimal code to produce tangible outcomes.

---

## Features

- **Simulated Conversations:** Users can talk to a ChatGPT-powered AI designed to emulate their chosen persona.
- **Twilio Integration:** Handles call initiation and management through Twilio's API.
- **Angular Frontend:** Provides a simple user interface for selecting personas and initiating calls.
- **Minimalistic Backend:** A single JavaScript file deployed on Twilio's server orchestrates the call flow.

## Limitations
- Phone Number Verification:
    - Due to Twilio's sandbox limitations, new numbers must be manually verified before calls can be made. A feature to automate this was considered but not implemented.

- Text-to-Speech (TTS) Personalization:
    - Routing ChatGPT’s responses through a third-party TTS service for more realistic persona voices was explored but deemed out of scope.


## Future Improvements
- Transition to a production Twilio account for broader accessibility.
- Add support for custom TTS voices.
- Improve persona customization for deeper engagement.


## Acknowledgments
- Twilio: For providing the telephony APIs.
- OpenAI: For ChatGPT integration.
