class SearchesController < ApplicationController
  def index
    @searches = Search.all
  end

  def new
    @search = Search.new
  end

  def create
    @search = Search.new(search_params)
    #redirect_to @search if it's here it goes to index
    if @search.save
      redirect_to @search #here it goes to show.html.erb
      @query = @search.entry
      gon.entry = @query
    else
      render 'new'
    end
  end

  def show
      @search = Search.find(params[:id])
      @query_test = @search.entry
      gon.search_test = @query_test
      latitudes_array = []
      longitudes_array = []
      businesses_array = []
      coordinates_array = []
      names_array = []
      businesses = Yelp.client.search(@query_test, { term: 'food' }).businesses
      businesses.each do |business|
        businesses_array.push(business)
        names_array.push(business.name)
        latitudes_array.push("#{business.location.coordinate.latitude}")
        longitudes_array.push("#{business.location.coordinate.longitude}")
      end
      @names = names_array
      @latitudes = latitudes_array
      @longitudes = longitudes_array
      @businesses = businesses_array
      gon.latitudes = @latitudes
      gon.longitudes = @longitudes
      gon.names = @names
  end

  private
    def search_params
      params.require(:search).permit(:entry)
    end
end
