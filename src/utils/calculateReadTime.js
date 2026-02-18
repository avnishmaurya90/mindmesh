export const calculateReadTime = (text)=>{
    if(!text) return 0;
    const wordsPerMinute = 100;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
}