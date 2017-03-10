$(document).ready(function(){$("#followers").click(function(){var username  = $('input[name="username"]').val();
                                                          
                                                            get_followers(username, 'followers');});
                            
                            $("#following").click(function(){var username  = $('input[name="username"]').val();
                                                          
                                                          get_followers(username, 'following');});

                            


                            });

function get_followers(username, direction){$.ajax({url: "", 
                                   		 type : "POST",
                                      	 data : {'username'  : username,
                                                 'direction' : direction,
                                        		 'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val()},
                                         success: function(result){for (var user in result ){add_row(result[user]);}}});}


function add_row(user){$(".test_table").append('<tr><td></td><td></td><td>'+
                                                user.user.username + 
                                                '</td><td>' + 
                                                user.user.full_name +
                                                '</td><td><img src="'+ 
                                                user.user.profile_pic_url_hd +
                                                '"></td></tr>');}