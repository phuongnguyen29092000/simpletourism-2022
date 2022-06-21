package com.example.simpletouristapp.adapter;

import android.content.Context;
import android.graphics.Paint;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.fragment.app.FragmentActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.fragment.NavHostFragment;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.R;
import com.example.simpletouristapp.SearchActivity;
import com.example.simpletouristapp.SearchResultFragment;
import com.example.simpletouristapp.model.News;
import com.example.simpletouristapp.model.Tour;
import com.example.simpletouristapp.service.ToursApiService;
import com.squareup.picasso.Picasso;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Locale;

public class TourAdapter extends RecyclerView.Adapter<TourAdapter.TourViewHolder> {

    private Context context;
    private List<Tour> tours;
    private List<Tour> mTourAll;
    private String fragment;

    public TourAdapter(Context context, List<Tour> tours,String fragment) {
        this.context = context;
        this.tours = tours;
        this.fragment = fragment;
    }

    public void initData(){this.mTourAll = new ArrayList<Tour>(tours);}

    @NonNull
    @Override
    public TourViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View view = inflater.inflate(R.layout.item_tour, parent, false);
        return new TourViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull TourViewHolder holder, int position) {
        Tour tour = tours.get(position);
        try {
            Picasso.get().load(ToursApiService.BASE_URL + tour.getImageAvatar().substring(7)).into(holder.imageTour);

        }catch (Exception e){
            Log.d("error",e.getMessage());
        }
        Locale lc = new Locale("nv","VN");
        NumberFormat nf = NumberFormat.getCurrencyInstance(lc);
        holder.nameTour.setText(tour.getNameTour());
        holder.price.setText(nf.format(tour.getPrice()));
        holder.tvDescription.setText(tour.getDescription());
        holder.rating.setRating(tour.getRating());
        holder.tvCompany.setText(tour.getCompanyName());
        if(tour.getDiscount() != 0){
            holder.cardDiscount.setVisibility(View.VISIBLE);
            holder.tvDiscount.setText("-" + Integer.toString((int)(tour.getDiscount()*100)) + "%");
            holder.tvDiscount.setVisibility(View.VISIBLE);
            holder.price.setPaintFlags(holder.price.getPaintFlags() | Paint.STRIKE_THRU_TEXT_FLAG);
            holder.priceAfterDiscount.setText(nf.format(tour.getPrice()*(1-tour.getDiscount())));
            holder.priceAfterDiscount.setVisibility(View.VISIBLE);
            holder.tvDescription.setMaxLines(2);
        }
        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Bundle bundle = new Bundle();
                bundle.putSerializable("IdTour", tour.getId());
                if(fragment.equals("search")){
                    Navigation.findNavController(view).navigate(R.id.action_nav_search_to_nav_detail_tour,bundle);
                }else {
                    if(fragment.equals("domestic")){
                        Navigation.findNavController(view).navigate(R.id.action_domestic_to_detailTour,bundle);
                    }else {
                        if(fragment.equals("international")){
                            Navigation.findNavController(view).navigate(R.id.action_international_to_detailTour,bundle);
                        }else {
                            if(fragment.equals("filter")){
                                Navigation.findNavController(view).navigate(R.id.action_nav_filter_to_nav_detail_tour,bundle);
                            }else {
                                if (fragment.equals("out_standing_tour")){
                                    Navigation.findNavController(view).navigate(R.id.action_nav_home_to_nav_detail_tour,bundle);
                                }
                            }

                        }
                    }
                }
            }
        });
    }

    @Override
    public int getItemCount() {
        return tours == null ? 0 : tours.size();
    }

    public void getTours(List<Tour> tours){
        this.tours = tours;
    }

    public class TourViewHolder extends RecyclerView.ViewHolder{
        private TextView nameTour;
        private TextView price;
        private ImageView imageTour;
        private TextView tvDescription;
        private CardView cardDiscount;
        private TextView tvDiscount;
        private TextView tvCompany;
        private TextView priceAfterDiscount;
        private RatingBar rating;
        public TourViewHolder(@NonNull View itemView) {
            super(itemView);
            nameTour = itemView.findViewById(R.id.tv_name_tour);
            price = itemView.findViewById(R.id.tv_price);
            imageTour = itemView.findViewById(R.id.image_tour);
            tvDescription = itemView.findViewById(R.id.tv_description);
            cardDiscount = itemView.findViewById(R.id.card_discount);
            tvDiscount = itemView.findViewById(R.id.tv_discount);
            priceAfterDiscount = itemView.findViewById(R.id.tv_price_after_discount);
            rating = itemView.findViewById(R.id.rating);
            tvCompany = itemView.findViewById(R.id.tv_company);
        }
    }
}
