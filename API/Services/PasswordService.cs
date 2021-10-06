using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace API.Services
{
	public static class PasswordService
	{
		public static string EncryptPassword(string p_password)
		{
			byte[] iv = new byte[16];
			byte[] array;
			string hashEncrypt = Environment.GetEnvironmentVariable("FIN_HASH_PASSWORD");

			using (Aes aes = Aes.Create())
			{
				aes.Key = Encoding.UTF8.GetBytes(hashEncrypt);
				aes.IV = iv;

				ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

				using (MemoryStream memoryStream = new MemoryStream())
				{
					using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, encryptor, CryptoStreamMode.Write))
					{
						using (StreamWriter streamWriter = new StreamWriter((Stream)cryptoStream))
						{
							streamWriter.Write(p_password);
						}

						array = memoryStream.ToArray();
					}
				}
			}

			return Convert.ToBase64String(array);
		}

		public static string DecryptString(string p_password)
		{
			byte[] iv = new byte[16];
			byte[] buffer = Convert.FromBase64String(p_password);
			string hashEncrypt = Environment.GetEnvironmentVariable("FIN_HASH_PASSWORD");

			using (Aes aes = Aes.Create())
			{
				aes.Key = Encoding.UTF8.GetBytes(hashEncrypt);
				aes.IV = iv;
				ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

				using (MemoryStream memoryStream = new MemoryStream(buffer))
				{
					using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, decryptor, CryptoStreamMode.Read))
					{
						using (StreamReader streamReader = new StreamReader((Stream)cryptoStream))
						{
							return streamReader.ReadToEnd();
						}
					}
				}
			}
		}

	}
}
