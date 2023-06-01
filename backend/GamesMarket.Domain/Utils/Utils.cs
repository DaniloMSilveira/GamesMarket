namespace GamesMarket.Domain.Utils
{
    public class Utils
    {
        public static string OnlyNumbers(string text)
        {
            var onlyNumber = "";
            foreach (var word in text)
            {
                if (char.IsDigit(word))
                {
                    onlyNumber += word;
                }
            }
            return onlyNumber.Trim();
        }
    }
}
