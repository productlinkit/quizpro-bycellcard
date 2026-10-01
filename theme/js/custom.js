var baseURL = window.location.origin;

$(document).ready(function () {

	$('#btnSearch').click(function() {
        $('#search').modal('show')
    });

	//category lavel open function (09.11.2022)
    $('#btnPlay').click(function() {
    	var gameId = $(this).attr('gameId');

    	$.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type : "POST",
            dataType : "json",
            url : baseURL + "/game_category",
            data : {  gameId : gameId,
                   },
            success: function (response)
            {
                if (response.success == 1)
                {
                    $('#level').modal('show');
                    var game_html = '';

                    if (response.result.length != 0)
                    {
                        $.each(response.result,function(index,data){

                            game_html +='<a href="'+baseURL+'/game/search/friend/'+data['id']+'" class="btn btn-lg text-start w-100 button-primary">'+data['title']+'<span class="add-point">+'+data['points']+' Point</span>'+
                                        '</a>';
                        });

                        $("div").removeClass("d-none");
                        $('div#search-result').html('');
                        $('div#search-result').html(game_html);
                    }
                }
                else if(response.success == 0)
                {
                    alert(response.massage);
                }
            }
        });
    });

    //custom language change [18.01.2023]
    $(document).on('change', '#lang', function() {
        var val = $(this).val();

        $.ajaxSetup({
            headers:{
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            }
        });
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url: baseURL+'/changlang',
            data: {
                val: val,
            },
        }).done(function (data) {
            location.reload();
        });
    });

});
