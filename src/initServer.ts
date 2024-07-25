import { URLSearchParams } from "node:url";
import express from "express";
import { request } from "undici";
import supabase from "./util/supabase";

export function initServer() {
  console.log("Initializing Express server...");
  const app = express();

  app.get("/", async ({ query }, response) => {
    const { code } = query;
    console.log("Received request with query code:", code);

    if (typeof code === "string") {
      try {
        console.log("Requesting OAuth2 token...");
        const tokenResponseData = await request(
          "https://discord.com/api/oauth2/token",
          {
            method: "POST",
            body: new URLSearchParams({
              client_id: process.env.VITE_DISCORD_CLIENT_ID!,
              client_secret: process.env.DISCORD_CLIENT_SECRET!,
              code,
              grant_type: "authorization_code",
              redirect_uri: process.env.VITE_REDIRECT_URI!,
              scope: "identify",
            }).toString(),
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
        );

        const oauthData = (await tokenResponseData.body.json()) as {
          access_token: string;
          expires_in: number;
          refresh_token: string;
          scope: string;
          token_type: string;
        };
        console.log("OAuth2 token received:", oauthData);

        console.log("Requesting user data from Discord...");
        const userResult = await request("https://discord.com/api/users/@me", {
          headers: {
            authorization: `${oauthData.token_type} ${oauthData.access_token}`,
          },
        });

        const data = (await userResult.body.json()) as {
          accent_color: any;
          avatar: string;
          avatar_decoration_data: any;
          banner: any;
          banner_color: any;
          clan: any;
          discriminator: string;
          flags: number;
          global_name: string;
          id: string;
          locale: string;
          mfa_enabled: boolean;
          premium_type: number;
          public_flags: number;
          username: string;
        };
        console.log("User data received from Discord:", data);

        console.log("Upserting user data into Supabase...");
        await supabase.from("discord_accounts").upsert({
          providerAccountId: Number(data.id),
          access_token: oauthData.access_token,
          refresh_token: oauthData.refresh_token,
          scope: oauthData.scope,
          token_type: oauthData.token_type,
          expires_in: oauthData.expires_in,
        });
        console.log("User data upserted into Supabase.");
      } catch (error) {
        // NOTE: An unauthorized token will not throw an error
        // tokenResponseData.statusCode will be 401
        console.error(
          "Error during OAuth2 token request or user data fetch:",
          error,
        );
      }
    } else {
      console.log("No valid code query parameter provided.");
    }

    return response.sendFile("index.html", { root: "." });
  });

  const port = process.env.PORT || 80;
  app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
  );
  console.log("Express server initialized.");
}
