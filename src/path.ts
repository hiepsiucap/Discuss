export const paths ={
 homePath() {
     return "/";
 },
 topicShowPath(topicSlug: string) {
      return `/topics/${topicSlug}`
 },
 postCreatePath(topicSlug : string) {
        return `/topics/${topicSlug}/posts/new`;
 },
 postShow(topicSlug: string, postId: string) {
      return `/topics/${topicSlug}/posts`;
 },
 postShowPath(topicSlug: string, postId: string) {
    return `/topics/${topicSlug}/posts/${postId}`
 }
 
}