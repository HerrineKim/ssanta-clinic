package com.ssafy.ssantaClinic.common.util;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

public class SEED {
    private static final Charset UTF_8 = StandardCharsets.UTF_8;

    private static final byte[] pbszUserKey = { (byte) 0x2c,(byte) 0x11, (byte) 0x19, (byte) 0x1d, (byte) 0x1f, (byte) 0x16, (byte) 0x12,
            (byte) 0x12,(byte) 0x11, (byte) 0x19, (byte) 0x1d, (byte) 0x1f, (byte) 0x10, (byte) 0x14, (byte) 0x1b, (byte) 0x16};
    private static final byte[] pbszIV = {(byte) 0x27, (byte) 0x28, (byte) 0x27, (byte) 0x6d, (byte) 0x2d, (byte) 0xd5, (byte) 0x4e,
            (byte)0x29, (byte) 0x2c, (byte) 0x56, (byte) 0xf4, (byte) 0x2a, (byte) 0x65, (byte) 0x2a, (byte) 0xae, (byte) 0x08};

    public static String encrypt(String rawMessage) {
        Encoder encoder = Base64.getEncoder();
        byte[] message = rawMessage.getBytes(UTF_8);
        byte[] encryptedMessage = KISA_SEED_CBC.SEED_CBC_Encrypt(pbszUserKey, pbszIV
                , message, 0, message.length);
        return new String(encoder.encode(encryptedMessage), UTF_8);
    }

    public static String decrypt(String encryptedMessage) {
        Decoder decoder = Base64.getDecoder();

        byte[] message = decoder.decode(encryptedMessage);
        byte[] decryptedMessage = KISA_SEED_CBC.SEED_CBC_Decrypt(pbszUserKey, pbszIV, message, 0, message.length);
        return new String(decryptedMessage, UTF_8);
    }
}
