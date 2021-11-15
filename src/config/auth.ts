interface AuthConfig {
    jwtSecretKey: string,
    exp: string,
    iss: string
}

export default {
    jwtSecretKey: process.env.JWT_SECRET_KEY as string,
    exp: "10m",
    iss: "botzap-api"
} as AuthConfig;
