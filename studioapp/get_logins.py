import re

follow_file = open('D:\\web\\7day\\studioapp\\follow.htm')
follow_file_content =  follow_file.readlines()

logins = re.findall(r'title="(\S+)"' , follow_file_content[-1])

lst_file = open('D:\\web\\7day\\studioapp\\unfollow', 'w')

lst_str = logins[0]

for i in logins[1:]:
	lst_str += '\n' + i

lst_file.write(lst_str)